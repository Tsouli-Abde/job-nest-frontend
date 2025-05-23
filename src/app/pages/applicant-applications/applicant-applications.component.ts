import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-applicant-applications',
  templateUrl: './applicant-applications.component.html',
  styleUrls: ['./applicant-applications.component.css']
})
export class ApplicantApplicationsComponent implements OnInit {
  applications: any[] = [];

  constructor(private applicationService: ApplicationService, private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user && user.role === 'applicant') {
      this.applicationService.getApplicationsByApplicant(user.id).subscribe({
        next: (apps) => this.applications = apps,
        error: () => console.error("Failed to load applications")
      });
    }
  }
}
