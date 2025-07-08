import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SearchModalComponent } from '../components/search-modal/search-modal.component';
import { LocalStorageService } from '../core/services/localstore.service';
import { TenantService } from '../core/services/tenant.service';
import { Modal } from '../core/helpers/modal.helper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchModalComponent, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  texts: string[] = [
    'Pay your school fees online easily.',
    'We offer safe and secure transactions.',
    'We offer easy payment verification.',
  ];
  typeSpeed = 100;
  deleteSpeed = 50;
  pauseAfterTyped = 1500;
  isModalOpen = false;
  displayText = '';
  private textIndex = 0;
  private charIndex = 0;
  private typing = true;

  tabs = [
    {
      icon: 'search',
      label: 'Search your school',
      content: 'Step 1: Search your school to begin.',
    },
    {
      icon: 'receipt',
      label: 'Select fee',
      content: 'Step 2: Choose your fee category.',
    },
    {
      icon: 'calendar_today',
      label: 'Select period to pay',
      content: 'Step 3: Pick the term/period to pay for.',
    },
    {
      icon: 'person',
      label: 'Provide details',
      content: 'Step 4: Enter your personal or student details.',
    },
    {
      icon: 'send',
      label: 'Make Transfer',
      content: 'Step 5: Make your payment or transfer.',
    },
  ];
  year = new Date().getFullYear();

  private tenantService = inject(TenantService);

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private router: Router,
    private localStore: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  get logo() {
    return this.tenantService.getLogo;
  }

  get footer() {
    return this.tenantService.footer;
  }

  activeTab = 0;

  get activeContent() {
    return this.tabs[this.activeTab].content;
  }

  setTab(index: number) {
    this.activeTab = index;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => this.loopTypewriter(), 500);
      });
    }
  }

  private loopTypewriter(): void {
    const currentText = this.texts[this.textIndex];

    if (this.typing) {
      if (this.charIndex < currentText.length) {
        this.displayText += currentText.charAt(this.charIndex++);
        this.ngZone.run(() => this.cdr.detectChanges()); // ✅ manually trigger change detection
        setTimeout(() => this.loopTypewriter(), this.typeSpeed);
      } else {
        this.typing = false;
        setTimeout(() => this.loopTypewriter(), this.pauseAfterTyped);
      }
    } else {
      if (this.charIndex > 0) {
        this.displayText = this.displayText.slice(0, --this.charIndex);
        this.ngZone.run(() => this.cdr.detectChanges()); // ✅
        setTimeout(() => this.loopTypewriter(), this.deleteSpeed);
      } else {
        this.typing = true;
        this.textIndex = (this.textIndex + 1) % this.texts.length;
        setTimeout(() => this.loopTypewriter(), 500);
      }
    }
  }

  openSearchModal() {
    // Custom Domain
    if (this.tenantService.config?.organization) {
      const tenant = this.tenantService.config?.organization;
      this.router.navigate(['fees', tenant._id]);
      this.localStore.setItem('_skool', JSON.stringify(tenant));
      return;
    }

    this.isModalOpen = true;
  }

  onCloseModal() {
    this.isModalOpen = false;
  }
}
