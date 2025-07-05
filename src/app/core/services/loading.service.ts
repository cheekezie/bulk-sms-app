// alert.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface LoadingDataI {
  title?: string;
  description?: string;
  show?: boolean;
}

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSubject = new Subject<LoadingDataI>();
  loading$ = this.loadingSubject.asObservable();

  toggleLoading(data: LoadingDataI) {
    this.loadingSubject.next(data);
  }
}
