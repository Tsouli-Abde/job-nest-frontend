import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';
import { ApplicantService } from '../../services/applicant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-applicant',
  templateUrl: './register-applicant.component.html',
  styleUrls: ['./register-applicant.component.css']
})
export class RegisterApplicantComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

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
      experiences: this.fb.array([this.createExperienceGroup()])
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

    this.applicantService.register(formData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Account created!',
          toast: true,
          position: 'top-end',
          timer: 2500,
          showConfirmButton: false,
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
