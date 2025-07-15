import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FeeI, ScheduleI } from 'src/app/core/model/payment.model';
import { CustomPipeModule } from 'src/app/core/pipes/pipe.module';
import { UtilService } from 'src/app/core/services/util.service';
import { UiModule } from '../ui/ui.module';

@Component({
  selector: 'app-payment-schedule',
  standalone: true,
  imports: [CustomPipeModule, CommonModule, UiModule],
  templateUrl: './payment-schedule.component.html',
  styleUrl: './payment-schedule.component.scss',
})
export class PaymentScheduleComponent {
  @Input() data: ScheduleI;
  @Output() itemSelect = new EventEmitter<ScheduleI>();
  constructor(private util: UtilService) {}
  get amountDue() {
    if (this.data.amountToComplete) {
      return this.data.amountToComplete;
    }
    if (this.data.amount) {
      return this.data.amount;
    }
    return 0;
  }

  get amountExpected() {
    const charge = this.data?.feeNGCharge ?? 0;
    if (this.data.actualAmount) {
      return this.data.actualAmount + charge;
    }
    if (this.data.amount) {
      return this.data.amount + charge;
    }
    return 0;
  }

  get termData() {
    return this.util.getTermData(this.data.term, this.data.schoolType);
  }

  get variation() {
    return Math.abs(this.data.variation ?? 0);
  }

  get variationLabel(): string {
    if ('variation' in this.data) {
      return this.data.variation < 1 ? 'Discount' : 'Extra';
    }

    return 'Discount';
  }

  onItemSelect() {
    this.itemSelect.emit(this.data);
  }
}
