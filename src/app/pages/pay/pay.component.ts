import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  Subscription,
  switchMap,
} from 'rxjs';
import { FormInputsModule } from 'src/app/components/form-inputs/form-inputs.module';
import { PayContainerComponent } from 'src/app/components/pay-container/pay-container.component';
import { PaymentScheduleComponent } from 'src/app/components/payment-schedule/payment-schedule.component';
import { UiModule } from 'src/app/components/ui/ui.module';
import { Semesters, Terms } from 'src/app/core/data/constants.data';
import { Alert } from 'src/app/core/helpers/alert.helper';
import { Loading } from 'src/app/core/helpers/loading.helper';
import { SessionI } from 'src/app/core/model/business.model';
import { FeeCycleEnums, PaymentInitEnums } from 'src/app/core/model/enums';
import { FeeI, ScheduleI } from 'src/app/core/model/payment.model';
import { StudentI } from 'src/app/core/model/student.mode';
import { CustomPipeModule } from 'src/app/core/pipes/pipe.module';
import { LocalStorageService } from 'src/app/core/services/localstore.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [
    CommonModule,
    CustomPipeModule,
    PayContainerComponent,
    FormInputsModule,
    FormsModule,
    UiModule,
    ReactiveFormsModule,
    PaymentScheduleComponent,
  ],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.scss',
})
export class PayComponent implements OnInit, OnDestroy {
  form: FormGroup;
  currStep = 1;
  loading = false;
  cycleEnums = FeeCycleEnums;
  methods = [
    {
      method: 'transfer',
      active: true,
      name: 'Bank Transfer',
      icon: 'account_balance',
    },
    {
      method: 'payattitude',
      active: false,
      name: 'Phone Number',
      image: '../../../assets/images/payattitude-logo.png',
    },
  ];
  terms: { code: string; title: string }[] = [];
  termLabel = 'Term';
  fee: FeeI;
  sessions: SessionI[] = [];
  searchSub$: Subscription;
  searching = false;
  verifiedStudent: StudentI | null;
  scheduleItems: ScheduleI[] = [];
  selectedSchedule: ScheduleI;
  scheduleId: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentS: PaymentService,
    private util: UtilService,
    private fb: FormBuilder,
    private router: Router,

    private localStore: LocalStorageService
  ) {
    this.form = this.fb.group({
      regNumber: [''],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', Validators.required],
      payerName: [''],
      term: [''],
      year: [''],
      extraInformation: [''],
      payerRegId: [''],
    });
  }

  get regCtrl() {
    return this.form.controls['regNumber'];
  }

  get studentFee() {
    return this.fee?.payerType === 'students';
  }

  get externalFee() {
    return this.fee?.payerType === 'others';
  }

  get openFee() {
    return this.externalFee && this.fee.systemType === 'open';
  }

  ngOnInit(): void {
    const item = this.localStore.getItem('_fee');
    const localStudent = this.localStore.getItem('_student');
    const sessionList = this.localStore.getItem('_sessions');

    if (localStudent) {
      const student: StudentI = JSON.parse(localStudent);
      this.verifiedStudent = student;
      this.regCtrl?.patchValue(student.regNumber);
      // this.regCtrl?.disable();
      this.regCtrl?.updateValueAndValidity();
    }

    if (item) {
      this.fee = JSON.parse(item);
      this.sessions = sessionList ? JSON.parse(sessionList) : [];
      this.handleTermArr();
      this.handleForm();
    } else {
      this.getFee();
    }

    this.searchSub$ = this.regCtrl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((text: string | null) => {
          const trimmed = text?.trim() ?? '';

          if (trimmed.length < 2) {
            this.searching = false;
            return of(null);
          }

          this.searching = true;
          return this.paymentS.verifyPayer(trimmed).pipe(
            catchError((err) => {
              this.verifiedStudent = null;
              this.searching = false;
              return of(null);
            })
          );
        })
      )
      .subscribe((result) => {
        this.verifiedStudent = result?.data ?? null;
        this.searching = false;
      });
  }

  ngOnDestroy(): void {
    this.searchSub$?.unsubscribe();
  }

  getFee() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.loading = true;
    this.paymentS.getFeeById(id).subscribe({
      next: (res) => {
        this.fee = res.data.fee;
        this.sessions = res.data.sessions;
        this.handleTermArr();
        this.handleForm();
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  handleForm() {
    if (this.studentFee) {
      this.form.get('regNumber')?.addValidators([Validators.required]);
    }

    if (this.externalFee) {
      this.form.get('payerName')?.addValidators([Validators.required]);
      this.form.get('year')?.addValidators([Validators.required]);
      if (this.fee.cycle === this.cycleEnums.TERMLY) {
        this.form.get('term')?.addValidators([Validators.required]);
      }
    }

    if (this.fee.externalList) {
      this.form.get('payerRegId')?.addValidators([Validators.required]);
      this.form.get('payerName')?.clearValidators();
    }

    this.form.updateValueAndValidity();
  }

  handleTermArr() {
    if (this.fee.organization.schoolType === 'tertiary') {
      this.terms = Semesters;
      this.termLabel = 'Semester';
    } else {
      this.terms = Terms;
    }
  }

  onSelectSchedule(schedule: ScheduleI) {
    if (!schedule.canPay as any) {
      Alert.show({
        type: 'error',
        position: 'top-center',
        description: 'You must start payment from the first schedule',
      });
      return;
    }
    this.selectedSchedule = schedule;
    this.currStep = 3;
  }

  onFormSubmit() {
    if (this.studentFee) {
      this.onGetPaymentSchedule();
    } else {
      this.currStep = 3;
    }
  }

  onSelectMethod(item: any) {
    const { method, active } = item;
    if (!active) {
      Alert.show({
        type: 'info',
        position: 'bottom-center',
        description: 'This service is not available. Pay with bank transfer',
      });
      return;
    }
    if (this.studentFee) {
      const data = {
        paymentChannel: method,
        scheduleId: this.scheduleId,
        email: this.form.value.email,
        phoneNumber: this.form.value.phoneNumber,
        scheduleDetailsId: this.selectedSchedule._id,
        closed: 'true',
      };
      this.onGenPaymentInvoice(data);
      return;
    }

    const data = {
      ...this.form.value,
      paymentChannel: method,
      feeId: this.fee._id,
      closed: 'false',
    };
    this.onGenPaymentInvoice(data);
  }

  onGetPaymentSchedule() {
    this.loading = true;
    this.paymentS
      .gePaymentSchedule(this.regCtrl.value, this.fee._id)
      .subscribe({
        next: (res) => {
          this.loading = false;
          const priority = {
            'part-payment': 1,
            overdue: 2,
            pending: 3,
          };

          const schedules = res.data.scheduleDetails.map((schedule, index) => {
            return {
              ...schedule,
              canPay: index === 0,
            };
          });

          this.scheduleItems = schedules;
          this.scheduleId = res.data._id;
          this.currStep++;
        },
        error: (err) => {
          Alert.show({ type: 'error', description: err?.error?.message });
          this.loading = false;
        },
      });
  }

  onGenPaymentInvoice(data: object) {
    Loading.show({ description: 'generating your payment invoice' });
    const payload = this.util.cleanObject(data);
    this.paymentS.initiatePayment(payload).subscribe({
      next: (res) => {
        Loading.hide();
        if (res.data.status === PaymentInitEnums.UPTODATE) {
          Alert.show({
            type: 'info',
            description:
              'Your payment is up to date. You have nothing to pay at this time for this fee',
          });
          return;
        }

        if (res.data.status === PaymentInitEnums.WALLETCOMPLETED) {
          Alert.show({ type: 'info', description: res.data.message });
          this.paymentS.setInvoiceInitData(null as any);
          this.router.navigate(['invoice', res.data.invoice.transactionRef]);
          return;
        }

        const data = { ...res.data, student: this.verifiedStudent as any };
        this.paymentS.setInvoiceInitData(data);
        this.router.navigate(['invoice', res.data.invoice.transactionRef]);
      },
      error: (err) => {
        Alert.show({ type: 'error', description: err?.error?.message });
        Loading.hide();
      },
    });
  }

  goBack() {
    if (this.currStep === 1) {
      this.util.goBack();
      return;
    }

    if (this.studentFee) {
      this.currStep--;
      return;
    }
    this.currStep = 1;
  }
}
