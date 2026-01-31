import { CanActivateFn, Router } from '@angular/router';
import { authService } from './auth/auth';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {

  const authServiceInAuthGuard = inject(authService);
  const router = inject(Router);

  return authServiceInAuthGuard.checkSession().pipe(
    map(() => true),
    catchError(() => {
      // router.navigate(['/login']);
      authServiceInAuthGuard.handleSessionExpired();
      return of(false);
    })
  );
};
