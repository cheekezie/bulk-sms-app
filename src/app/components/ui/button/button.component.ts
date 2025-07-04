import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() label = '';
  @Input() class = '';
  @Input() disabled = false;
  @Input() loading = false;
  @Output() onClick = new EventEmitter();

  click() {
    this.onClick.emit();
  }
}
