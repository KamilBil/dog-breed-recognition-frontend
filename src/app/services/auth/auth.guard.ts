import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await firstValueFrom(authService.isAuthenticated());

  if (route.routeConfig?.path === 'login') {
    if (isAuthenticated) {
      router.navigate(['/']);
      return false;
    }
    return true;
  } else {
    if (isAuthenticated) {
      return true;
    }
    router.navigate(['/login']);
    return false;
  }
};
