import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';
import {
  FeeI,
  FeesDataResponse,
  InitiatePaymentResponse,
  ScheduleI,
  SchoolSearchResI,
} from '../model/payment.model';
import { FeeApi, PaymentApi } from '../data/api.data';
import { OrganizationTypeEnums } from '../model/enums';
import { BusinessI, SessionI } from '../model/business.model';
import { StudentI } from '../model/student.mode';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private reqS: RequestService) {}

  public searchSchool(search: string): Observable<{ data: SchoolSearchResI }> {
    const params = new HttpParams({
      fromObject: {
        search: search,
      },
    });
    return this.reqS.get(PaymentApi.searchSchool, params);
  }

  public schoolFeeList(search: string) {
    const params = new HttpParams({
      fromObject: {
        orgId: search,
        includeArchive: false,
      },
    });
    return this.reqS.get<{ data: FeesDataResponse }>(
      FeeApi.feeListBySchool,
      params
    );
  }

  public payerFeeListbByReg(
    regNumber: string
  ): Observable<{ data: SchoolSearchResI }> {
    const params = new HttpParams({
      fromObject: {
        regNumber,
      },
    });
    return this.reqS.get(FeeApi.feeListByRegNumber, params);
  }

  public getFeeById(id: string): Observable<{
    data: { fee: FeeI; sessions: SessionI[] };
  }> {
    return this.reqS.get(FeeApi.singleFeeById + '/' + id);
  }

  public verifyPayer(regNumber: string): Observable<{
    data: StudentI;
  }> {
    return this.reqS.get(PaymentApi.verifyPayer + '/' + regNumber);
  }

  public initiatePayment(data: any): Observable<{
    data: InitiatePaymentResponse;
    message: string;
    status: string;
  }> {
    return this.reqS.post(PaymentApi.init, data);
  }

  public gePaymentSchedule(regNumber: string, fee: string) {
    const params = new HttpParams({
      fromObject: {
        regNumber,
        fee,
      },
    });
    return this.reqS.get<{
      data: {
        regNumber: string;
        fee: string;
        scheduleDetails: ScheduleI[];
        _id: string;
      };
    }>(PaymentApi.getSchedule, params);
  }
}
