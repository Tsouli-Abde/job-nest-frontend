import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { ApplicantService } from '../../services/applicant.service';
import Swal from "sweetalert2";
import {AuthService} from "../../services/auth.service";
import {JobExperienceService} from "../../services/job-experience.service";

@Component({
  selector: 'app-applicant-profile',
  templateUrl: './applicant-profile.component.html',
  styleUrls: ['./applicant-profile.component.css']
})
export class ApplicantProfileComponent implements OnInit {
  applicationId!: string;
  application: any;
  applicant: any;
  loading = true;
  error = false;
  jobExperiences: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private applicantService: ApplicantService,
    protected authService: AuthService,
    private jobExperienceService: JobExperienceService
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.paramMap.get('applicationId')!;
    this.loadApplication();
  }

  loadApplication(): void {
    this.applicationService.getApplicationById(this.applicationId).subscribe({
      next: (app) => {
        this.application = app;
        this.loadApplicant(app.applicant.id);
      },
      error: () => {
        this.loading = false;
        this.error = true;
      }
    });
  }

  loadApplicant(applicantId: string): void {
    this.applicantService.getApplicantById(applicantId).subscribe({
      next: (user) => {
        this.applicant = user;
        this.loadJobExperiences(applicantId);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      }
    });
  }

  loadJobExperiences(applicantId: string): void {
    this.jobExperienceService.getJobExperiencesByApplicant(applicantId).subscribe({
      next: (data) => this.jobExperiences = data,
      error: (err) => console.error('Failed to load experiences:', err)
    });
  }

  changeStatus(newStatus: string): void {
    Swal.fire({
      title: `Confirm action`,
      text: `Are you sure you want to mark this application as '${newStatus.toLowerCase()}'?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, confirm',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.applicationService.updateStatus(this.application.id, newStatus).subscribe({
          next: (res) => {
            this.application.status = res.status;
            Swal.fire('Updated!', `Status changed to ${res.status.toLowerCase()}.`, 'success');
          },
          error: () => {
            Swal.fire('Error', 'Could not update status.', 'error');
          }
        });
      }
    });
  }
}
