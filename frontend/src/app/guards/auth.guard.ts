// src/app/guards/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const isLoginPage = route.routeConfig?.path === 'login';

    return this.authService.isTokenValid().pipe(
      switchMap(isValid => {
        if (isValid) {
          if (isLoginPage) {
            const role = this.authService.getUserRole();
            if (role === 'Doctor' || role === 'Admin') {
              this.router.navigate(['/dashboard']);
            } else if (role === 'Patient') {
              this.router.navigate(['/patient']);
            }
            return of(false);
          }
          return of(true);
        } else {
          if (!isLoginPage) {
            this.router.navigate(['/login']);
            return of(false);
          }
          return of(true);
        }
      })
    );
  }
}