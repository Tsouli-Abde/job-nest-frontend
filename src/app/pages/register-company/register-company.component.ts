import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {CompanyService} from "../../services/company.service";

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder, private router: Router,
              private companyService: CompanyService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      companyName: ['', Validators.required],
      website: [''],
      industry: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      username: ['', Validators.required],
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

    this.companyService.register(this.registerForm.value).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Account created!',
          text: 'Welcome to JobNest.',
          confirmButtonColor: '#6d7549',
        }).then(() => {
          this.router.navigate(['/login']);
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
