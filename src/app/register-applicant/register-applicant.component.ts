import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicantService } from '../services/applicant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-applicant',
  templateUrl: './register-applicant.component.html',
  styleUrls: ['./register-applicant.component.css']
})
export class RegisterApplicantComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private applicantService: ApplicantService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      skills: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitted = false;

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control && control.invalid && (control.touched || this.submitted));
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete form',
        text: 'Please fill all required fields',
        position: 'top-end',
        toast: true,
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    this.applicantService.register(this.registerForm.value).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Account created!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
        });
        this.registerForm.reset();
        this.submitted = false;
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error during registration',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  }
}
