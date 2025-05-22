import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApplicantService } from '../../services/applicant.service';
import { CompanyService } from '../../services/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isApplicant = false;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private applicantService: ApplicantService,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    const role = this.authService.getRole();
    console.log('Detected role:', role);
    this.isApplicant = role === 'applicant';
  
    if (this.isApplicant) {
      this.profileForm = this.fb.group({
        username: [user.username],
        email: [user.email],
        phoneNumber: [user.phoneNumber || ''],
        password: [user.password],
        firstName: [user.firstName],
        lastName: [user.lastName],
        skills: [user.skills || '']
      });
    } else {
      this.profileForm = this.fb.group({
        username: [user.username],
        email: [user.email],
        phoneNumber: [user.phoneNumber || ''],
        password: [user.password],
        companyName: [user.companyName],
        industry: [user.industry || '']
      });
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;

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
