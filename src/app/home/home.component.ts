import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  NgZone,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Alert } from '../core/helpers/alert.helper';
import { Loading } from '../core/helpers/loading.helper';
import { PaymentService } from '../core/services/payment.service';
import { TenantService } from '../core/services/tenant.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  form: FormGroup;

  private tenantService = inject(TenantService);

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router,
    private msgService: PaymentService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.form = this.fb.group({
      recipients: ['', [Validators.required]],
      message: '',
      sender: '',
    });
  }

  ngOnInit(): void {}

  private parseRecipients(input: string): string[] {
    return input
      .split(/[\n,]+/g) // split by newline or comma
      .map((r) => r.trim())
      .filter(Boolean);
  }

  onSubmit() {
    const form = this.form.value;
    const recipients = this.parseRecipients(form.recipients);
    const payload = {
      ...form,
      recipients,
    };
    Loading.show();
    this.msgService.sendSms(payload).subscribe({
      next: (res) => {
        this.form.reset();
        Loading.hide();
        Alert.modal({ type: 'success', message: res.message });
      },
      error: () => {
        Loading.hide();
      },
    });
  }
}
