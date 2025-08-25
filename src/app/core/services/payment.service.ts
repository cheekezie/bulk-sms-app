import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private initSubject = new BehaviorSubject<any>(null);
  invoiceInit$ = this.initSubject.asObservable();

  constructor(private reqS: RequestService) {}

  public sendSms(data: any): Observable<{
    message: string;
    status: string;
  }> {
    return this.reqS.post('messaging/send-sms', data);
  }
}
