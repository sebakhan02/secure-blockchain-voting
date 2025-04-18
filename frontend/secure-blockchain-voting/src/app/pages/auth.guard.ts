import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    try {
      const decoded: any = jwtDecode(token);  // Use jwtDecode instead of jwt_decode
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

      if (decoded.exp < currentTime) {
        localStorage.removeItem('access_token');
        return inject(Router).createUrlTree(['/signin']);
      }

      if (
        state.url.includes('/signin') ||
        state.url.includes('/signup') ||
        state.url.includes('/auth')
      ) {
        return inject(Router).createUrlTree(['/user/dashboard']);
      }

      return true;
    } catch (error) {
      localStorage.removeItem('access_token');
      return inject(Router).createUrlTree(['/signin']);
    }
  }

  if (
    state.url.includes('/signin') ||
    state.url.includes('/signup') ||
    state.url.includes('/auth') ||
    state.url.includes('/landingpage')
  ) {
    return true;
  }

  return inject(Router).createUrlTree(['/signin']);
};
