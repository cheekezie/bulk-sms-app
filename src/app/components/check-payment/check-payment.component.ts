import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import { InvoiceI, SearchSchoolI } from 'src/app/core/model/payment.model';
import { StudentI } from 'src/app/core/model/student.mode';
import { CustomPipeModule } from 'src/app/core/pipes/pipe.module';
import { LocalStorageService } from 'src/app/core/services/localstore.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { TenantService } from 'src/app/core/services/tenant.service';

@Component({
  selector: 'app-check-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CustomPipeModule],
  templateUrl: './check-payment.component.html',
  styleUrl: './check-payment.component.scss',
})
export class CheckPaymentComponent implements OnInit, OnDestroy, OnChanges {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter();
  @Output() selectStudent = new EventEmitter();
  schoolResults: SearchSchoolI[] = [];
  studentResults: StudentI[] = [];
  refSearchCtrl = new FormControl('');
  studentSearchCtrl = new FormControl('');
  searching = false;
  isEmpty = false;
  searchSub$: Subscription;
  private schoolLookup$: Subject<void> = new Subject();
  view: 'student' | 'reference' | 'account_number' = 'student';
  result: InvoiceI[] = [];
  constructor(
    private paymentS: PaymentService,
    private router: Router,
    private tenant: TenantService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private localStore: LocalStorageService
  ) {}

  get isDefaulTenant() {
    return this.tenant.config.isDefault;
  }
  ngOnInit(): void {
    // Search Student With Reg Number
    this.searchSub$ = this.studentSearchCtrl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((text: string | null) => {
          const trimmed = text?.trim() ?? '';

          // 🔹 Case: empty input
          if (trimmed.length < 2) {
            this.searching = false;
            this.studentResults = []; // ✅ clear results immediately
            return of(null); // ✅ skip API call
          }

          // 🔹 Case: valid input
          this.searching = true;
          this.isEmpty = false;
          return this.paymentS.searchStudents(trimmed).pipe(
            catchError((err) => {
              this.studentResults = [];
              this.searching = false;
              this.isEmpty = true;
              return of(null);
            })
          );
        })
      )
      .subscribe((results) => {
        if (results?.data?.data) {
          this.studentResults = results.data.data;
          this.isEmpty = !results?.data.data.length;
        }
        this.searching = false;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'].currentValue === true) {
      this.renderer.addClass(this.document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(this.document.body, 'no-scroll');
    }
  }

  onItemSelect(item: any) {}

  onSelectSchool(school: SearchSchoolI) {
    this.router.navigate(['fees', school._id]);
    this.localStore.setItem('_skool', JSON.stringify(school));
  }

  onSelectStudent(student: StudentI) {
    this.selectStudent.emit(student);
    this.onClose();
  }

  onClose() {
    this.closeModal.emit();
  }

  ngOnDestroy(): void {
    this.searchSub$?.unsubscribe();
    this.renderer.removeClass(this.document?.body, 'no-scroll');
  }
}
