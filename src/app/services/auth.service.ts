import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly key = 'loggedInApplicant';

  login(applicant: any): void {
    localStorage.setItem(this.key, JSON.stringify(applicant));
  }

  logout(): void {
    localStorage.removeItem(this.key);
  }

  getCurrentApplicant(): any {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentApplicant();
  }
}
