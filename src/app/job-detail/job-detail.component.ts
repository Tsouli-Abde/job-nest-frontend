import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../services/job.service';
import { Job } from '../models/job';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job!: Job;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.jobService.getJobById(id).subscribe((job) => {
        this.job = job;
        this.loadMap();
      });
    }
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
}
