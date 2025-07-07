import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckPaymentComponent } from 'src/app/components/check-payment/check-payment.component';
import { CheckoutComponent } from 'src/app/components/checkout/checkout.component';
import { PayContainerComponent } from 'src/app/components/pay-container/pay-container.component';
import { UiModule } from 'src/app/components/ui/ui.module';
import { Alert } from 'src/app/core/helpers/alert.helper';
import { BusinessI } from 'src/app/core/model/business.model';
import { PaymentStatusEnums } from 'src/app/core/model/enums';
import { InvoiceI } from 'src/app/core/model/payment.model';
import { StudentI } from 'src/app/core/model/student.mode';
import { CustomPipeModule } from 'src/app/core/pipes/pipe.module';
import { PaymentService } from 'src/app/core/services/payment.service';
import { TenantService } from 'src/app/core/services/tenant.service';

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [
    CustomPipeModule,
    PayContainerComponent,
    CommonModule,
    UiModule,
    CheckPaymentComponent,
    // CheckoutComponent,
  ],
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.scss',
})
export class PaymentHistoryComponent implements OnInit {
  result: InvoiceI[] = [];
  loading = false;
  isModalOpen = false;
  isEmpty = false;
  payerName = '';
  regNumber = '';
  school: Partial<BusinessI>;
  statusEnums = PaymentStatusEnums;
  canPayStatus = [PaymentStatusEnums.PENDING, PaymentStatusEnums.PART_PAYMENT];
  redStatus = [PaymentStatusEnums.CANCELLED, PaymentStatusEnums.EXPIRED];
  query = {};
  constructor(
    private paymentS: PaymentService,
    private router: Router,
    private tenant: TenantService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // attach custom tenant ID to query to steamline search to school
    if (this.tenant.config?.organization) {
      this.query = {
        organization: this.tenant.config?.organization._id,
      };
    }

    const regNo = this.activatedRoute.snapshot.queryParamMap.get('regNumber');
    if (regNo) {
      this.query = {
        ...this.query,
        regNumber: regNo,
      };
      this.getMyInvoices();
    } else {
      this.isModalOpen = true;
    }
  }

  getMyInvoices() {
    this.loading = true;
    this.isEmpty = false;
    this.paymentS.myInvoices(this.query).subscribe({
      next: ({ data }) => {
        this.result = data.payments.map((p) => {
          const totalPaid = p.paymentHistory.reduce(
            (acc, curr) => acc + curr.amount,
            0
          );
          const trxnAmount = p.transactionAmount;
          const actualPaid = Math.min(totalPaid, trxnAmount);

          return {
            ...p,
            toalAmountPaid: p.paymentCompleted ? trxnAmount : actualPaid,
          };
        });
        this.isEmpty = !data?.payments.length;

        this.loading = false;
      },
      error: (err) => {
        Alert.show({ type: 'error', description: err?.error?.message });
        this.loading = false;
        this.loading = true;
      },
    });
  }

  onStudentSelect(item: StudentI) {
    this.payerName = item.fullName;
    this.regNumber = item.regNumber;
    this.school = item.organization;
    this.query = {
      regNumber: item.regNumber,
    };
    this.router.navigate([], {
      queryParams: {
        regNumber: item.regNumber,
      },
      queryParamsHandling: 'merge',
    });
    this.getMyInvoices();
  }

  onItemSelect(item: InvoiceI) {
    this.router.navigate(['invoice', item.transactionRef]);
  }

  payNow(event: MouseEvent, item: InvoiceI) {
    event.stopPropagation();
    // this.router.navigate(['invoice', item.transactionRef]);
  }

  download(event: MouseEvent, item: InvoiceI) {
    event.stopPropagation();
  }

  onToggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }
}
