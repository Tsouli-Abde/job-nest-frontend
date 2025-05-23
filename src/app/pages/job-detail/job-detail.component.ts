import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job!: Job;
  hasApplied = false;
  private jobId!: string;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private http: HttpClient,
    private authService: AuthService,
    private applicationService: ApplicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id')!;
    this.loadJobDetails();

    if (this.jobId) {
      const currentUser = this.authService.getCurrentUser();
      this.jobService.getJobById(this.jobId).subscribe(job => {
        this.job = job;
  
        if (currentUser?.id) {
          this.applicationService.hasAlreadyApplied(currentUser.id, this.jobId).subscribe(res => {
            this.hasApplied = res;
          });
        }
      });
    }
  }

  loadJobDetails(): void {
    this.jobService.getJobById(this.jobId).subscribe({
      next: (job) => {
        this.job = job;
        this.loadMap();

        const user = this.authService.getCurrentUser();
        if (user?.type === 'applicant') {
          this.applicationService.hasAlreadyApplied(user.id, this.jobId).subscribe({
            next: (res) => this.hasApplied = res,
            error: () => this.hasApplied = false
          });
        }
      },
      error: () => {
        console.error('Job not found or error fetching job');
        this.router.navigate(['/jobs']);
      }
    });
  }

  loadMap(): void {
    const query = encodeURIComponent(this.job.location);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

    this.http.get<any[]>(url).subscribe((res) => {
      if (res.length > 0) {
        const lat = res[0].lat;
        const lon = res[0].lon;

        const map = L.map('job-map').setView([lat, lon], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const marker = L.marker([lat, lon], {
          icon: L.divIcon({
            className: 'custom-marker',
            html: '',
            iconSize: [0, 0]
          })
        }).addTo(map);

        marker.bindPopup(`📍 ${this.job.location}`).openPopup();
      }
    });
  }

  onApply(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], {
        queryParams: { redirectTo: `/jobs/${this.jobId}` }
      });
    } else {
      this.router.navigate([`/jobs/${this.jobId}/apply`]);
    }
  }
}
