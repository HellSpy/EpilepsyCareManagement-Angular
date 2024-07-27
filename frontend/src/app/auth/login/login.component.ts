// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  role: string = 'Patient'; // Default role value

  constructor(private authService: AuthService, private router: Router) {}

  onLoginSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.error(err);
        alert('Invalid credentials');
      }
    });
  }

  onRegisterSubmit() {
    this.authService.register(this.name, this.registerEmail, this.registerPassword, this.role).subscribe({
      next: res => {
        alert('Registration successful');
      },
      error: err => {
        console.error(err);
        alert('Registration failed');
      }
    });
  }
}
