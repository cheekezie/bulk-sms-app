import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.scss',
})
export class SearchModalComponent {
  @Output() closeModal = new EventEmitter();
  results = Array.from({ length: 1 }, (_, i) => `School #${i + 1}`);
  onClose() {
    this.closeModal.emit();
  }
}
