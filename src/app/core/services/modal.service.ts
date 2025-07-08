// alert.service.ts
import { Component, Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';

export interface ModalDataI {
  component: Type<any>;
  componentProps?: { [key: string]: any };
  modalClass?: string;
  title?: string;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalSubject = new Subject<ModalDataI>();
  modal$ = this.modalSubject.asObservable();
  private responseSubject: Subject<any> | null = null;

  private closeModalSubject = new Subject<void>();
  public closeModal$ = this.closeModalSubject.asObservable();

  showModal<T = any, R = any>(data: any) {
    this.responseSubject = data.response$ ?? new Subject<R>();
    this.modalSubject.next({ ...data, response$: this.responseSubject });
  }

  closeModal<R = any>(data: R) {
    if (this.responseSubject) {
      this.responseSubject.next(data);
      this.responseSubject.complete();
      this.responseSubject = null;
    }

    // Notify modal component to close
    this.closeModalSubject.next();
  }
}
