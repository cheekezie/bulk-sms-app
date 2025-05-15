import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.scss',
})
export class SearchModalComponent {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter();
  results = Array.from({ length: 10 }, (_, i) => ({
    image:
      'https://www.swisskidsacademy.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fswiss_logo.9ee6cc78.jpg&w=96&q=75',
    name: `school ${i + 1}`,
  }));

  onClose() {
    this.closeModal.emit();
  }
}
