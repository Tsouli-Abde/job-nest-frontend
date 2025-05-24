import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:8080/api/v1/jobs';

  constructor(private http: HttpClient) { }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  getJobsByCompany(companyId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/company/${companyId}`);
  }

  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }

  getJobById(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }

  getFilteredJobs(filters: any): Observable<Job[]> {
    let params = new HttpParams();

    if (filters.location) {
      params = params.set('location', filters.location);
    }
    if (filters.type) {
      params = params.set('type', filters.type);
    }
    if (filters.experienceLevel) {
      params = params.set('experienceLevel', filters.experienceLevel);
    }
    if (filters.salaryMin) {
      params = params.set('salaryMin', filters.salaryMin);
    }
    if (filters.salaryMax) {
      params = params.set('salaryMax', filters.salaryMax);
    }

    return this.http.get<Job[]>(`${this.apiUrl}/filter`, { params });
  }

  getAllJobsSorted(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}`);
  }
}
