import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicantService } from '../../services/applicant.service';
import { CompanyService } from '../../services/company.service';
import Swal from 'sweetalert2';
import { JobExperienceService } from "../../services/job-experience.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isApplicant = false;
  jobExperiences: any[] = [];

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private applicantService: ApplicantService,
    private companyService: CompanyService,
    private jobExperienceService: JobExperienceService
  ) { }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    const role = this.authService.getRole();
    console.log('Detected role:', role);
    this.isApplicant = role === 'applicant';

    if (this.isApplicant) {
      this.profileForm = this.fb.group({
        username: [{ value: user.username, disabled: true }],
        email: [user.email, [Validators.required, Validators.email]],
        phoneNumber: [user.phoneNumber || '', Validators.required],
        password: [user.password],
        firstName: [user.firstName, Validators.required],
        lastName: [user.lastName, Validators.required],
        skills: [user.skills || '', Validators.required]
      });
      this.loadJobExperiences(user.id);
    } else {
      this.profileForm = this.fb.group({
        username: [{ value: user.username, disabled: true }],
        email: [user.email, [Validators.required, Validators.email]],
        phoneNumber: [user.phoneNumber || '', Validators.required],
        password: [user.password],
        companyName: [user.companyName, Validators.required],
        industry: [user.industry || '', Validators.required]
      });
    }
  }

  loadJobExperiences(applicantId: string): void {
    this.jobExperienceService.getJobExperiencesByApplicant(applicantId)
      .subscribe({
        next: (data) => this.jobExperiences = data,
        error: (err) => console.error('Failed to load experiences:', err)
      });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched(); // force l'affichage des erreurs
      Swal.fire({
        icon: 'warning',
        title: 'Please complete all required fields.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    const formValues = this.profileForm.value;
    const role = this.authService.getRole();

    if (role === 'applicant') {
      const updatedData = {
        id: currentUser.id,
        username: formValues.username,
        password: formValues.password,
        email: formValues.email,
        phoneNumber: formValues.phoneNumber,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        skills: formValues.skills,
      };

      this.applicantService.updateApplicant(currentUser.id, updatedData).subscribe({
        next: (res) => {
          this.authService.setCurrentUser(res);
          Swal.fire('Saved !', 'Your profile has been updated.', 'success');
        },
        error: () => {
          Swal.fire('Error', 'Failed to update profile.', 'error');
        }
      });

    } else if (role === 'company') {
      const updatedData = {
        id: currentUser.id,
        username: formValues.username,
        password: formValues.password,
        email: formValues.email,
        phoneNumber: formValues.phoneNumber,
        companyName: formValues.companyName,
        industry: formValues.industry,
      };

      this.companyService.updateCompany(currentUser.id, updatedData).subscribe({
        next: (res) => {
          this.authService.setCurrentUser(res);
          Swal.fire('Saved !', 'Your company profile has been updated.', 'success');
        },
        error: () => {
          Swal.fire('Error', 'Failed to update company profile.', 'error');
        }
      });
    }
  }
}
