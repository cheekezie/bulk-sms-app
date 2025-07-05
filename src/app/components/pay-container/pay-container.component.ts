import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SidebarVectorComponent } from '../sidebar-vector/sidebar-vector.component';
import { LocalStorageService } from 'src/app/core/services/localstore.service';
import { TenantService } from 'src/app/core/services/tenant.service';
import { SearchSchoolI } from 'src/app/core/model/payment.model';
import { CommonModule, Location } from '@angular/common';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-pay-container',
  standalone: true,
  imports: [SidebarVectorComponent, CommonModule],
  templateUrl: './pay-container.component.html',
  styleUrl: './pay-container.component.scss',
})
export class PayContainerComponent implements OnInit {
  school: SearchSchoolI | undefined;
  @Output() back = new EventEmitter();
  @Input() fee: string | undefined;
  @Input() payerName: string;
  @Input() customBack: boolean;
  private tenantService = inject(TenantService);
  constructor(
    private localStore: LocalStorageService,
    private util: UtilService
  ) {}

  get logo() {
    return this.tenantService.getLogo;
  }

  ngOnInit(): void {
    const item = this.localStore.getItem('_skool');
    if (item) {
      this.school = JSON.parse(item);
    } else {
      this.goBack();
    }
  }

  goBack() {
    if (this.customBack) {
      this.back.emit();
      return;
    }

    this.util.goBack();
  }
}
