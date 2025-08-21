// alert.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AlertDataI {
  view?: 'snackbar' | 'modal';
  type: 'success' | 'error' | 'warning' | 'info' | 'alternate';
  title?: string;
  message: string;
  autoDismiss?: boolean;
  position?:
    | 'top-center'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private alertSubject = new Subject<AlertDataI>();
  alert$ = this.alertSubject.asObservable();

  showAlert(data: AlertDataI) {
    this.alertSubject.next({
      position: 'top-center',
      autoDismiss: true,
      ...data,
    });
  }
}
