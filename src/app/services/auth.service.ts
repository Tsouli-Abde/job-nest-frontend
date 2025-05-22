import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly key = 'loggedInUser';
  private readonly baseUrl = 'http://localhost:8080/api/v1';

  private currentUser: any = this.getCurrentUser();

  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/applicants/login`, credentials).pipe(
      map((res: any) => ({ ...res, role: 'applicant' })),
      catchError(() => {
        return this.http.post(`${this.baseUrl}/companies/login`, credentials).pipe(
          map((res: any) => ({ ...res, role: 'company' }))
        );
      })
    );
  }

  saveUserToLocalStorage(user: any): void {
    localStorage.setItem(this.key, JSON.stringify(user));
  }

  logout(): void {
    this.currentUser = null;
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
