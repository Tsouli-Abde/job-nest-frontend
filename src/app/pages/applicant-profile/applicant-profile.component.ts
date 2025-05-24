import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { ApplicantService } from '../../services/applicant.service';

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

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private applicantService: ApplicantService
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
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      }
    });
  }
}
