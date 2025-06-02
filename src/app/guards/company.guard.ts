import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CompanyGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(_: any, state: RouterStateSnapshot): boolean {
    const user = this.authService.getCurrentUser();

    if (user && user.role === 'company') {
      return true;
    }
    this.router.navigate(['/login-company'], {
      queryParams: { redirectTo: state.url }
    });
    return false;
  }
}
