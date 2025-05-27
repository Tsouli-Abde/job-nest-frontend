import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {CompanyService} from "../../services/company.service";
import {JobService} from "../../services/job.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-jobs',
  templateUrl: './company-jobs.component.html',
  styleUrls: ['./company-jobs.component.css']
})
export class CompanyJobsComponent implements OnInit {
  jobs: any[] = [];

  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user?.role !== 'company') return;

    this.companyService.getCompanyJobs(user.id).subscribe({
      next: (data) => this.jobs = data,
      error: () => console.error('Failed to load company jobs')
    });
  }

  deleteJob(jobId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This job posting will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.jobService.deleteJob(jobId).subscribe({
          next: () => {
            this.jobs = this.jobs.filter(job => job.id !== jobId);
            Swal.fire(
              'Deleted!',
              'The job has been deleted.',
              'success'
            );
          },
          error: () => {
            Swal.fire(
              'Error!',
              'Failed to delete the job.',
              'error'
            );
          }
        });
      }
    });
  }
}
