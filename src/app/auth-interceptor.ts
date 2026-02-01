import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastService } from './shared/toast';


let isSessionHandled = false; // 🔑 prevents duplicate handling

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const toastService = inject(ToastService);

  // Clone request to include credentials (cookies)
  const authReq = req.clone({
    withCredentials: true
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      isSessionHandled = true;

      if (error.status === 401 || error.status === 403 || !isSessionHandled) {
        toastService.show('You’ve been disconnected due to session expiry');
        router.navigate(['/session-expired']);
      }

      return throwError(() => error);
    })
  );

};
