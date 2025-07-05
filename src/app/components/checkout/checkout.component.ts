import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { VirtualAccountDetailsI } from 'src/app/core/model/payment.model';
import { CustomPipeModule } from 'src/app/core/pipes/pipe.module';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, CustomPipeModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  @Input() account?: VirtualAccountDetailsI;
  @Input() isOpen: boolean;
  @Input() checkingPayment: boolean;
  @Input() amount: number;
  @Output() close = new EventEmitter();
  @Output() checkPayment = new EventEmitter();

  private util = inject(UtilService);

  get bankLogo() {
    if (this.account?.bankName.toUpperCase().includes('GT')) {
      return 'https://cloudfilesstore.blob.core.windows.net/icons/Banks/000013.png';
    }
    if (this.account?.bankName.toUpperCase().includes('GLOBUS')) {
      return './../../../assets/images/globus-bank.jpeg';
    }
    if (this.account?.bankName.toUpperCase().includes('WEMA')) {
      return 'https://cloudfilesstore.blob.core.windows.net/icons/Banks/000017.png';
    }
    return '';
  }

  onClose() {
    this.close.emit();
  }
  onCheckPayment() {
    this.checkPayment.emit();
  }

  copy(target: 'amount' | 'acc_no') {
    if (target === 'acc_no') {
      this.util.copy(this.account?.accountNumber);
      return;
    }

    this.util.copy(this.amount);
  }
}
