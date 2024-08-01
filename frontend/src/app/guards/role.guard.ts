// src/app/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
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
      return false;
    }
    return true;
  }
}