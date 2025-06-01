import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobExperience } from '../models/job-experience.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobExperienceService {
  private apiUrl = 'http://localhost:8080/api/v1/job-experiences';

  constructor(private http: HttpClient) {}

  getJobExperiencesByApplicant(applicantId: string): Observable<JobExperience[]> {
    return this.http.get<JobExperience[]>(`${this.apiUrl}/applicant/${applicantId}`);
  }

  createJobExperience(experience: JobExperience): Observable<JobExperience> {
    return this.http.post<JobExperience>(`${this.apiUrl}/applicant/${experience.applicantId}`, experience);
  }

  updateJobExperience(id: string, experience: JobExperience): Observable<JobExperience> {
    return this.http.put<JobExperience>(`${this.apiUrl}/${id}`, experience);
  }

  deleteJobExperience(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
