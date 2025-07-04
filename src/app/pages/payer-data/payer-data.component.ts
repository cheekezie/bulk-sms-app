import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { PayContainerComponent } from 'src/app/components/pay-container/pay-container.component';

@Component({
  selector: 'app-payer-data',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PayContainerComponent,
  ],
  templateUrl: './payer-data.component.html',
  styleUrl: './payer-data.component.scss',
})
export class PayerDataComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }
  onSubmit() {}
}
