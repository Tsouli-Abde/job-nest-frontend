import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {CompanyService} from "../../services/company.service";

@Component({
  selector: 'app-company-jobs',
  templateUrl: './company-jobs.component.html',
  styleUrls: ['./company-jobs.component.css']
})
export class CompanyJobsComponent implements OnInit {
  jobs: any[] = [];

  constructor(
    private authService: AuthService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user?.role !== 'company') return;

    this.companyService.getCompanyJobs(user.id).subscribe({
      next: (data) => this.jobs = data,
      error: () => console.error('Failed to load company jobs')
    });
  }
}
