import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApplicantService } from '../../services/applicant.service';
import { CompanyService } from '../../services/company.service';
import Swal from 'sweetalert2';
import { JobExperienceService } from "../../services/job-experience.service";
import {lastValueFrom, Observable} from "rxjs";

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
        experiences: this.fb.array([]),
        username: [{ value: user.username, disabled: true }],
        email: [user.email, [Validators.required, Validators.email]],
        phoneNumber: [user.phoneNumber || '', [Validators.pattern('^[0-9]*$')]],
        password: [user.password],
        firstName: [user.firstName, Validators.required],
        lastName: [user.lastName, Validators.required],
        skills: [user.skills || '']
      });
      this.loadJobExperiences(user.id);
    } else {
      this.profileForm = this.fb.group({
        username: [{ value: user.username, disabled: true }],
        email: [user.email, [Validators.required, Validators.email]],
        phoneNumber: [user.phoneNumber || '', [Validators.pattern('^[0-9]*$')]],
        password: [user.password],
        companyName: [user.companyName, Validators.required],
        industry: [user.industry || ''],
        website: [user.website || '']
      });
    }
  }

  get experiences(): FormArray {
    return this.profileForm.get('experiences') as FormArray;
  }

  addExperience(): void {
    const experienceGroup = this.fb.group({
      id: [null],
      companyName: [''],
      position: [''],
      startDate: [''],
      endDate: [''],
      description: ['']
    });
    this.experiences.push(experienceGroup);
  }

  removeExperience(index: number): void {
    const experience = this.experiences.at(index).value;

    if (experience.id) {
      this.jobExperienceService.deleteJobExperience(experience.id).subscribe({
        next: () => {
          this.experiences.removeAt(index);
          Swal.fire('Deleted', 'Experience removed.', 'success');
        },
        error: () => {
          Swal.fire('Error', 'Failed to delete experience.', 'error');
        }
      });
    } else {
      this.experiences.removeAt(index);
    }
  }

  deleteExperience(index: number): void {
    const experience = this.experiences.at(index).value;

    if (!experience.id) return;

    Swal.fire({
      title: 'Are you sure?',
      text: 'This experience will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.jobExperienceService.deleteJobExperience(experience.id).subscribe({
          next: () => {
            this.experiences.removeAt(index);
            Swal.fire('Deleted!', 'The experience has been removed.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'Failed to delete the experience.', 'error');
          }
        });
      }
    });
  }

  loadJobExperiences(applicantId: string): void {
    this.jobExperienceService.getJobExperiencesByApplicant(applicantId)
      .subscribe({
        next: (data) => {
          const formGroups = data.map(exp => this.fb.group({
            id: [exp.id],
            companyName: [exp.companyName],
            position: [exp.position],
            description: [exp.description],
            startDate: [exp.startDate],
            endDate: [exp.endDate]
          }));
          this.profileForm.setControl('experiences', this.fb.array(formGroups));
        },
        error: (err) => console.error('Failed to load experiences:', err)
      });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
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
        username: currentUser.username,
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

          const saveExperiences = formValues.experiences.map((exp: any) => {
            exp.applicantId = currentUser.id;
            if (exp.id) {
              return this.jobExperienceService.updateJobExperience(exp.id, exp);
            } else {
              return this.jobExperienceService.createJobExperience(exp);
            }
          });

          Promise.all(saveExperiences.map((obs: Observable<any>) => lastValueFrom(obs))).then(() => {
            Swal.fire('Saved!', 'Your profile and experiences have been updated.', 'success');
          }).catch(() => {
            Swal.fire('Error', 'Some experiences could not be saved.', 'error');
          });
        },
        error: () => {
          Swal.fire('Error', 'Failed to update profile.', 'error');
        }
      });

    } else if (role === 'company') {
      const updatedData = {
        id: currentUser.id,
        username: currentUser.username,
        password: formValues.password,
        email: formValues.email,
        phoneNumber: formValues.phoneNumber,
        companyName: formValues.companyName,
        industry: formValues.industry,
        website: formValues.website,
      };

      this.companyService.updateCompany(currentUser.id, updatedData).subscribe({
        next: (res) => {
          this.authService.setCurrentUser(res);
          Swal.fire('Saved!', 'Your company profile has been updated.', 'success');
        },
        error: () => {
          Swal.fire('Error', 'Failed to update company profile.', 'error');
        }
      });
    }
  }
}
