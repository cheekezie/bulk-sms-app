import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayContainerComponent } from 'src/app/components/pay-container/pay-container.component';
import { FeeI } from 'src/app/core/model/payment.model';
import { CustomPipeModule } from 'src/app/core/pipes/pipe.module';
import { LocalStorageService } from 'src/app/core/services/localstore.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { PayerDataComponent } from '../payer-data/payer-data.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UtilService } from 'src/app/core/services/util.service';
import { SessionI } from 'src/app/core/model/business.model';
import { UiModule } from 'src/app/components/ui/ui.module';
import { Alert } from 'src/app/core/helpers/alert.helper';

@Component({
  selector: 'app-fee-select',
  standalone: true,
  imports: [
    CommonModule,
    CustomPipeModule,
    PayContainerComponent,
    FormsModule,
    UiModule,
    ReactiveFormsModule,
  ],
  templateUrl: './fee-select.component.html',
  styleUrl: './fee-select.component.scss',
})
export class FeeSelectComponent {
  loading = true;
  fees: FeeI[] = [];
  step = 1;
  form: FormGroup;
  sessions: SessionI[] = [];
  constructor(
    private util: UtilService,
    private activatedRoute: ActivatedRoute,
    private paymentS: PaymentService,
    private fb: FormBuilder,
    private localStore: LocalStorageService,
    private router: Router
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.getFees();
  }

  getFees() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.loading = true;
    this.paymentS.schoolFeeList(id).subscribe({
      next: (res) => {
        this.fees = res.data.fees;
        this.sessions = res.data.sessions;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onSelect(fee: FeeI) {
    if (!fee.active) {
      Alert.show({
        type: 'error',
        title: 'Payment not allowed',
        description:
          'Payment is not currently allowed for this fee. Check back later.',
      });
      return;
    }

    this.router.navigate(['pay', fee._id]);
    this.localStore.setItem('_fee', JSON.stringify(fee));
    this.localStore.setItem('_sessions', JSON.stringify(this.sessions));
  }

  goBack() {
    this.util.goBack();
  }
}
