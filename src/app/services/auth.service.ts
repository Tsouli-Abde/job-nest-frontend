import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly key = 'loggedInUser';
  private readonly baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  loginApplicant(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/applicants/login`, credentials);
  }

  loginCompany(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/companies/login`, credentials);
  }

  saveUserToLocalStorage(user: any): void {
    localStorage.setItem(this.key, JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem(this.key);
  }

  getCurrentUser(): any {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  getRole(): 'applicant' | 'company' | null {
    const user = this.getCurrentUser();
    return user?.role ?? null;
  }

  setCurrentUser(updatedUser: any): void {
    if (!updatedUser.role) {
      updatedUser.role = this.getRole();
    }
    localStorage.setItem(this.key, JSON.stringify(updatedUser));
  }
}
