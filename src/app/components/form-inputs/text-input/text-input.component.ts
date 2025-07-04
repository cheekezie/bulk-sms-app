import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() max: number;
  @Input() min: number;
  @Input() maxLength: any = undefined;
  @Input() mode: any;
  @Input() placeholder = '';
  @Input() inputClass: string;
  @Input() pattern: string;
  @Input() name: string;
  @Input() id: string;
  @Input() type = 'text';
  value: any; // Bound value for the select
  disabled = false;
  @Input() loading = false;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};
  updateValueAndValidity: () => void = () => {};

  // Called by Angular when writing a value to the control
  writeValue(value: any): void {
    this.value = value;
  }

  // Registers a callback function that should be called when the value changes
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Registers a callback function that should be called when the control is touched
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Handles the `ionChange` event
  handleChange(event: any) {
    const selectedValue = event.target.value; // Extract the value from event.detail
    this.value = selectedValue;
    this.onChange(selectedValue); // Notify the parent form control of the value change
    this.onTouched();
    this.updateValueAndValidity();
  }
}
