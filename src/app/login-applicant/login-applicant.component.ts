import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApplicantService } from '../services/applicant.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login-applicant',
  templateUrl: './login-applicant.component.html',
  styleUrls: ['./login-applicant.component.css']
})
export class LoginApplicantComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private applicantService: ApplicantService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;
  
    this.applicantService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.authService.login(response);
        this.router.navigate(['/']);
        Swal.fire({
          icon: 'success',
          title: 'Welcome back !',
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
