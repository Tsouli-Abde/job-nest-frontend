import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  filterForm!: FormGroup;

  constructor(private fb: FormBuilder, private jobService: JobService) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      location: [''],
      type: [''],
      experienceLevel: [''],
      salaryMin: [''],
      salaryMax: ['']
    });

    this.fetchJobs();
  }

  applyFilters(): void {
    const rawFilters = this.filterForm.value;
  
    const filters: any = {};
    Object.keys(rawFilters).forEach(key => {
      const value = rawFilters[key];
      if (value !== null && value !== '') {
        if (key === 'salaryMin' || key === 'salaryMax') {
          filters[key] = Number(value);
        } else {
          filters[key] = value;
        }
      }
    });
  
    this.jobService.getFilteredJobs(filters).subscribe({
      next: (jobs) => this.jobs = jobs,
      error: (err) => console.error(err)
    });
  }   

  fetchJobs(): void {
    this.jobService.getAllJobsSorted().subscribe((data) => {
      this.jobs = data;
    });
  }
}
