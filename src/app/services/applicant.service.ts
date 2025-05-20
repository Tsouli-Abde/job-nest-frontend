import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Applicant } from '../models/applicant.model';

@Injectable({ providedIn: 'root' })
export class ApplicantService {
  private apiUrl = 'http://localhost:8080/api/v1/applicants';

  constructor(private http: HttpClient) {}

  register(applicantData: Applicant): Observable<Applicant> {
    return this.http.post<Applicant>(`${this.apiUrl}/register`, applicantData);
  }
}
