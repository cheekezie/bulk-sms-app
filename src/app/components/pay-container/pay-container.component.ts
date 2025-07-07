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
import { Router } from '@angular/router';
import { BusinessI } from 'src/app/core/model/business.model';

@Component({
  selector: 'app-pay-container',
  standalone: true,
  imports: [SidebarVectorComponent, CommonModule],
  templateUrl: './pay-container.component.html',
  styleUrl: './pay-container.component.scss',
})
export class PayContainerComponent {
  @Input() school: Partial<BusinessI>;
  @Output() back = new EventEmitter();
  @Input() fee: string | undefined;
  @Input() payerName: string;
  @Input() customBack: boolean;
  @Input() showSchoolName: boolean;
  private tenantService = inject(TenantService);
  constructor(
    private localStore: LocalStorageService,
    private util: UtilService,
    private router: Router
  ) {}

  get logo() {
    return this.tenantService.getLogo;
  }

  get schoolData() {
    if (this.tenantService.config?.organization) {
      const org = this.tenantService.config.organization;
      return {
        name: org.organizationName,
        logo: org.kycDocument.logo,
      };
    }
    if (this.school) {
      return {
        name: this.school.organizationName,
        logo: this.school?.logo || this.school?.kycDocument?.logo,
      };
    }

    if (this.localStore) {
      return {
        name: this.localSchool?.organizationName,
        logo: this.localSchool?.logo || this.localSchool?.kycDocument?.logo,
      };
    }
    return {
      name: '',
      logo: '',
    };
  }

  get localSchool() {
    const item = this.localStore.getItem('_skool');
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goBack() {
    if (this.customBack) {
      this.back.emit();
      return;
    }

    this.util.goBack();
  }
}
