// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  msg: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'auth-token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: LoginResponse) => {
        console.log('Login successful, setting token:', response.token);
        localStorage.setItem(this.tokenKey, response.token);
      })
    );
  }

  register(name: string, email: string, password: string, role: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, { name, email, password, role }).pipe(
      tap((response: RegisterResponse) => {
        console.log('Registration response:', response);
      })
    );
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    // console.log('Retrieved token:', token);
    return token;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  isTokenValid(): Observable<boolean> {
    const token = this.getToken();
    if (!token) {
      return of(false);
    }
    
    return this.http.get<any>(`${this.apiUrl}/validate-token`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(() => true), // If the request succeeds, the token is valid
      catchError(() => {
        console.log('Token is invalid');
        this.logout();
        return of(false);
      })
    );
  }

  logout(): void {
    console.log('Logging out, removing token');
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const loggedIn = !!this.getToken();
    // console.log('Is logged in:', loggedIn);
    return loggedIn;
  }

  getUserRole(): string {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('User role from token:', payload.user.role);
      return payload.user.role;
    }
    console.log('No token found, returning empty role');
    return '';
  }
  getUserEmail(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Token payload:', payload);  // Log the payload to check its structure
      return payload.user.email;
    }
    return null;
  }  
}
