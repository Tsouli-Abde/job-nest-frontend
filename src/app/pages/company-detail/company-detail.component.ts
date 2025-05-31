import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';
import { Job } from '../../models/job';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  company!: Company;
  jobs: Job[] = [];

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    const companyId = this.route.snapshot.paramMap.get('id');
    if (companyId) {
      this.companyService.getCompanyById(companyId).subscribe({
        next: (data) => {
          this.company = data;
    
          this.jobService.getJobsByCompany(companyId).subscribe({
            next: (jobList) => this.jobs = jobList,
            error: () => console.error('Error loading company jobs')
          });
        },
        error: () => console.error('Company not found.')
      });
    }
  }
}
