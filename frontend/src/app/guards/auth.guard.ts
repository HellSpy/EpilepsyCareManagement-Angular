// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const isLoginPage = route.routeConfig?.path === 'login';

    if (isLoggedIn) {
      if (isLoginPage) {
        const role = this.authService.getUserRole();
        if (role === 'Doctor' || role === 'Admin') {
          this.router.navigate(['/dashboard']);
        } else if (role === 'Patient') {
          this.router.navigate(['/patient']);
        }
        return false;
      }
      return true;
    } else {
      if (!isLoginPage) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
  }
}