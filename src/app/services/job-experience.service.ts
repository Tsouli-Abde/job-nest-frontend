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

  addExperience(applicantId: string, experience: JobExperience): Observable<any> {
    return this.http.post(`${this.apiUrl}/applicant/${applicantId}`, experience);
  }
  getJobExperiencesByApplicant(applicantId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/applicant/${applicantId}`);
  }
}
