// src/app/shared/navigation-panel/navigation-panel.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class NavigationPanelComponent implements OnInit {
  userEmail: string | null = '';
  userRole: string | null = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();
    this.userRole = this.authService.getUserRole();
    console.log('User email:', this.userEmail);  // Log the email to verify it's retrieved
    console.log('User role:', this.userRole);  // Log the role to verify it's retrieved
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
