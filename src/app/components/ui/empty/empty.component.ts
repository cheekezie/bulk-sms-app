import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty',
  template: `
    <div *ngIf="show" class="my-10 flex flex-col items-center justify-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
        alt="No data illustration"
        class="w-24 h-24 mb-4 opacity-50"
      />
      <p class="text-grey text-center text-sm">
        {{ message || 'No  data found' }}
      </p>
    </div>
  `,
})
export class EmptyComponent {
  @Input() show: boolean;
  @Input() message: string;
}
