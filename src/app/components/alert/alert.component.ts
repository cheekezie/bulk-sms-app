import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { AlertDataI, AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent implements OnInit, OnDestroy {
  alert: AlertDataI | null = null;
  private sub!: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.sub = this.alertService.alert$.subscribe((data) => {
      this.alert = data;
      timer(4000).subscribe(() => (this.alert = null)); // auto-dismiss
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
