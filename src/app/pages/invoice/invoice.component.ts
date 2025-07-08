import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { PayContainerComponent } from 'src/app/components/pay-container/pay-container.component';
import { UiModule } from 'src/app/components/ui/ui.module';
import { Loading } from 'src/app/core/helpers/loading.helper';
import { PaymentStatusEnums } from 'src/app/core/model/enums';
import { InitiatePaymentResponse } from 'src/app/core/model/payment.model';
import { CustomPipeModule } from 'src/app/core/pipes/pipe.module';
import { PaymentService } from 'src/app/core/services/payment.service';
import { UtilService } from 'src/app/core/services/util.service';
import { CheckoutComponent } from '../../components/checkout/checkout.component';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    CustomPipeModule,
    PayContainerComponent,
    CommonModule,
    UiModule,
    CheckoutComponent,
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss',
})
export class InvoiceComponent implements OnInit, OnDestroy {
  private sub!: Subscription;
  data: InitiatePaymentResponse;
  isCheckoutOpen = false;
  checkingPayment = false;
  canPayStatus = [PaymentStatusEnums.PENDING, PaymentStatusEnums.PART_PAYMENT];
  constructor(
    private paymentS: PaymentService,
    private title: Title,
    private util: UtilService,
    private activatedRoute: ActivatedRoute
  ) {}

  get termData() {
    return this.util.getTermData(
      this.data.invoice.term,
      this.data.orgObject.schoolType
    );
  }

  get arrearsText() {
    return this.data?.arrears ? 'Arrears' : 'Current Period';
  }

  get payerName() {
    return (
      this.data?.invoice?.payerName ||
      this.data?.invoice?.studentName ||
      this.data?.invoice?.customerName
    );
  }

  get canPay() {
    return (
      this.data?.invoice?.paymentStatus === PaymentStatusEnums.PENDING ||
      this.data?.invoice?.paymentStatus === PaymentStatusEnums.PART_PAYMENT
    );
  }

  get accountDetails() {
    return this.data?.invoice?.virtualAccountDetails;
  }

  get amountToPay() {
    return this.data?.amountToPay != null
      ? this.data?.amountToPay
      : this.data?.invoice.transactionAmount;
  }

  ngOnInit(): void {
    this.sub = this.paymentS.invoiceInit$.pipe(take(1)).subscribe((data) => {
      if (data && this) {
        this.data = data;
        this.setTitle();
        this.isCheckoutOpen = this.canPayStatus.includes(
          this.data?.invoice?.paymentStatus
        );
      } else {
        this.getInvoiceByRef();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onCheckPayment() {
    this.checkingPayment = true;
    this.getInvoiceByRef();
  }

  getInvoiceByRef() {
    // show initial loader when checkout is not open
    if (!this.checkingPayment) {
      Loading.show({ description: 'Getting your invoice details' });
    }

    const ref = this.activatedRoute.snapshot.paramMap.get('ref');
    if (ref) {
      this.paymentS.invoiceDetails(ref).subscribe({
        next: (res) => {
          const invoice = res.data.payment;

          // mutate object to mock payment init response
          const { arrears, organization, fee } = invoice;

          const data = {
            invoice: invoice,
            arrears: arrears,
            orgObject: organization,
            feeObject: fee,
            amountToPay: res.data.amountToPay,
            classObject: res.data.classObject,
            amountPaid: res.data.amountPaid,
            student: res.data.student,
          };

          this.data = data as any;
          this.isCheckoutOpen = this.canPayStatus.includes(
            invoice?.paymentStatus
          );
          this.checkingPayment = false;

          this.setTitle();
          Loading.hide();
        },
        error: () => {
          Loading.hide();
          this.checkingPayment = false;
        },
      });
    }
  }

  setTitle() {
    this.title.setTitle(
      `Invoice | ${this.data.invoice.fee.title} | ${this.data.invoice.transactionRef}`
    );
  }

  onDownload() {
    if (this.data.invoice.paymentCompleted) {
      // download receipt
      return;
    }

    // download invoice
  }

  goBack() {
    this.util.goBack();
  }

  toggleCheckout() {
    this.isCheckoutOpen = !this.isCheckoutOpen;
  }
}
