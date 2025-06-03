import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {CompanyService} from "../../services/company.service";
import {AuthService} from "../../services/auth.service";
import { companyUsernameAvailableValidator } from '../../validators/async-validators';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private companyService: CompanyService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      companyName: ['', Validators.required],
      website: [''],
      industry: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      username: ['', [Validators.required], [companyUsernameAvailableValidator(this.companyService)]],      
      password: ['', Validators.required],
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched || this.isSubmitted);
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.registerForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Please complete the form properly',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    const credentials = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    };

    this.companyService.register(this.registerForm.value).subscribe({
      next: () => {
        this.companyService.login(credentials).subscribe({
          next: (response) => {
            this.authService.saveUserToLocalStorage({ ...response, role: 'company' });
            Swal.fire({
              icon: 'success',
              title: 'Welcome!',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500
            });

            this.router.navigate(['/']);
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Login failed',
              text: 'Please try again manually.',
              confirmButtonColor: '#dc3545'
            });
          }
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Registration failed',
          text: 'Please try again later.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }
}
