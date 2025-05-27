import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Application } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl = 'http://localhost:8080/api/v1/applications';

  constructor(private http: HttpClient) {}

  submitApplication(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getApplicationsByApplicant(applicantId: string): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/applicant/${applicantId}`);
  }

  hasAlreadyApplied(applicantId: string, jobId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/has-applied`, {
      params: { applicantId, jobId }
    });
  }

  getApplicationById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  updateStatus(appId: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${appId}/status`, null, {
      params: { status }
    });
  }
}
