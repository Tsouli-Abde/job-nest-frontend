import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApplicantService } from '../../services/applicant.service';
import Swal from 'sweetalert2';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import { usernameAvailableValidator } from '../../validators/async-validators';

@Component({
  selector: 'app-register-applicant',
  templateUrl: './register-applicant.component.html',
  styleUrls: ['./register-applicant.component.css']
})
export class RegisterApplicantComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  redirectTo: string = '/';

  constructor(private fb: FormBuilder,
              private applicantService: ApplicantService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.redirectTo = params['redirectTo'] || '/';
    });

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      skills: [''],
      username: ['', [Validators.required], [usernameAvailableValidator(this.applicantService)]],   
      password: ['', Validators.required],
      experiences: this.fb.array([])
    });
  }

  get experiences(): FormArray {
    return this.registerForm.get('experiences') as FormArray;
  }

  createExperienceGroup(): FormGroup {
    return this.fb.group({
      companyName: ['', Validators.required],
      position: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['']
    });
  }

  addExperience(): void {
    this.experiences.push(this.createExperienceGroup());
  }

  removeExperience(index: number): void {
    this.experiences.removeAt(index);
  }

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

    const formData = this.registerForm.value;

    formData.experiences = formData.experiences.filter((exp: any) =>
      exp.companyName || exp.position || exp.startDate || exp.endDate || exp.description
    );

    const credentials = {
      username: formData.username,
      password: formData.password
    };

    this.applicantService.register(formData).subscribe({
      next: () => {
        this.applicantService.login(credentials).subscribe({
          next: (response) => {
            this.authService.saveUserToLocalStorage({ ...response, role: 'applicant' });

            Swal.fire({
              icon: 'success',
              title: 'Welcome !',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500
            });

            this.router.navigateByUrl(this.redirectTo);
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Login failed',
              text: 'Please log in manually.',
              confirmButtonColor: '#dc3545'
            });
          }
        });

        this.registerForm.reset();
        this.experiences.clear();
        this.experiences.push(this.createExperienceGroup());
        this.submitted = false;
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error during registration',
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
        });
      }
    });
  }
}
