import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export const HttpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  // const accountS = inject(AccountService); // Dependency injection in standalone mode
  const router = inject(Router);

  // Prepend the base URL if not already present
  const url = req.url.startsWith('http')
    ? req.url
    : `${environment.baseUrl}${req.url}`;

  const clonedRequest = req.clone({
    url: url,
    setHeaders: {
      Accept: 'application/json',
      // Authorization: `Bearer ${currentUser}`,
    },
  });

  return next(clonedRequest).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 503) {
          console.error('Service unavailable');
        }

        if (err.status === 401) {
          router.navigate(['/']);
        } else if (err.status === 0) {
          console.error('Please make sure you are connected to the internet');
        } else {
          const msg =
            typeof err.error?.message === 'object'
              ? 'Oops! Please try again.'
              : err.error?.message || 'An error occurred.';
        }
      }

      return throwError(() => err); // Rethrow the error
    })
  );
};
