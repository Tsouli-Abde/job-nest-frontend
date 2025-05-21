import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  get isApplicant(): boolean {
    return this.authService.getRole() === 'applicant';
  }

  get isCompany(): boolean {
    return this.authService.getRole() === 'company';
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
