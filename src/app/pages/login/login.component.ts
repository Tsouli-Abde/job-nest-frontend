import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false;
  userType: 'applicant' | 'company' = 'applicant';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userType = this.route.snapshot.data['userType'] || 'applicant';

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    const credentials = this.loginForm.value;

    const loginObservable =
      this.userType === 'company'
        ? this.authService.loginCompany(credentials)
        : this.authService.loginApplicant(credentials);

    loginObservable.subscribe({
      next: (response) => {
        this.authService.saveUserToLocalStorage({ ...response, role: this.userType });

        const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') || '/';
        this.router.navigateByUrl(redirectTo);

        Swal.fire({
          icon: 'success',
          title: 'Welcome back!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Invalid credentials',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
  }
}
