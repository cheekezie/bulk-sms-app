import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent {
  @Input() data: any[] = [];
  @Input() valueKey = '';
  @Input() labelKey = '';
  @Input() inputClass = '';
  @Input() label = '';
  disabled = false;
  value: any; // Bound value for the select

  get isObjectArray() {
    return this.data.length > 0 && typeof this.data[0] === 'object';
  }

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

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

  // Handles the input event
  handleChange(event: any) {
    const selectedValue = event.target.value; // ✅ Works for native HTML input
    this.value = selectedValue;
    this.onChange(selectedValue); // Notify parent form
    this.onTouched();
  }
}
