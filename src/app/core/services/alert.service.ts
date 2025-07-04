// alert.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AlertDataI {
  type: 'success' | 'error' | 'warning';
  title?: string;
  description: string;
  position?:
    | 'top-center'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private alertSubject = new Subject<AlertDataI>();
  alert$ = this.alertSubject.asObservable();

  showAlert(data: AlertDataI) {
    this.alertSubject.next({ position: 'top-center', ...data });
  }
}
