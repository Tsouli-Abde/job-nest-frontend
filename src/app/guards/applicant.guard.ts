import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class ApplicantGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(_: any, state: RouterStateSnapshot): boolean {
    const user = this.authService.getCurrentUser();

    if (user && user.role === 'applicant') {
      return true;
    }

    this.router.navigate(['/login'], {
      queryParams: { redirectTo: state.url }
    });
    return false;
  }
}
