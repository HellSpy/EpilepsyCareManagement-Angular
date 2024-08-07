// src/app/guards/role.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.isTokenValid().pipe(
      switchMap(isValid => {
        if (!isValid) {
          this.router.navigate(['/login']);
          return of(false);
        }

        const expectedRoles = route.data['roles'] as Array<string>;
        const userRole = this.authService.getUserRole();
        if (!expectedRoles.includes(userRole)) {
          if (userRole === 'Patient') {
            this.router.navigate(['/patient']);
          } else if (userRole === 'Doctor' || userRole === 'Admin') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/login']);
          }
          return of(false);
        }
        return of(true);
      })
    );
  }
}