import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(
    private readonly http: HttpClient
  ) //private cookieS: CookieService
  {}

  /**
   * GET wrapper.
   *
   * @param endpoint - Full path.
   */

  get _getHeaders() {
    //const token = this.cookieS.getCookie(LocalStoreEnums.TOKEN);

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    return headers;
  }
  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    const headers = this._getHeaders;
    return this.http.get<T>(endpoint, { headers, params });
  }

  post<T>(endpoint: string, data: Object): Observable<T> {
    const headers = this._getHeaders;
    return this.http.post<T>(endpoint, data, { headers });
  }

  put<T>(endpoint: string, data: Object): Observable<T> {
    const headers = this._getHeaders;
    return this.http.put<T>(endpoint, data, { headers });
  }

  patch<T>(endpoint: string, data: Object): Observable<T> {
    const headers = this._getHeaders;
    return this.http.patch<T>(endpoint, data, { headers });
  }

  delete<T>(endpoint: string): Observable<T> {
    const url = environment.baseUrl + endpoint;
    const headers = this._getHeaders;
    return this.http.delete<T>(url, { headers });
  }

  getFile<T>(endpoint: string, params?: HttpParams): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = environment.baseUrl + endpoint;
    return this.http.get<Blob>(url, {
      headers,
      params,
      responseType: 'blob' as 'json',
    });
  }
}
