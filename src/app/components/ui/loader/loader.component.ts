import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  @Input() type: 'bar' | 'circle';
  @Input() class = '';
  @Input() show: boolean;
  @Input() color: 'primary' | 'secondary' | 'default';

  get bg() {
    if (this.color === 'default') {
      return '';
    }
    return 'bg-' + this.color;
  }
}
