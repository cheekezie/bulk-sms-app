import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import {
  LoadingDataI,
  LoadingService,
} from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-loading-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-modal.component.html',
  styleUrl: './loading-modal.component.scss',
})
export class LoadingModalComponent {
  isOpen = true;
  loadingText = '';

  loading: LoadingDataI | null = null;
  private sub!: Subscription;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.sub = this.loadingService.loading$.subscribe((data) => {
      this.loading = data;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
