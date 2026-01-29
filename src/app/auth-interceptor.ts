import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  // Clone request to include credentials (cookies)
  const authReq = req.clone({
    withCredentials: true
  });

  return next(authReq).pipe(
    catchError((error) => {

      if (error.status === 401 || error.status === 403) {
        alert('Session expired. Please login again.');
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );

};
