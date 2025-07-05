import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertService } from './core/services/alert.service';
import { Alert } from './core/helpers/alert.helper';
import { AlertComponent } from './components/alert/alert.component';
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';
import { Loading } from './core/helpers/loading.helper';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlertComponent, LoadingModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'fees-payment-portal';

  constructor(
    private renderer: Renderer2,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) {
    Alert.registerService(this.alertService); // Register once
    Loading.registerService(this.loadingService); // Register once
  }

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
