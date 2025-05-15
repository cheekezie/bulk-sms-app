import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'fees-payment-portal';

  constructor(private renderer: Renderer2) {}
  ngAfterViewInit() {
    const maxWait = 5000; // 5 seconds fallback
    const start = performance.now();

    const checkReady = () => {
      if (
        (window as any).__tenantMetaReady ||
        performance.now() - start > maxWait
      ) {
        const loader = this.renderer.selectRootElement('#appLoader', true);
        this.renderer.setStyle(loader, 'display', 'none');
      } else {
        requestAnimationFrame(checkReady);
      }
    };

    // checkReady();
  }
}
