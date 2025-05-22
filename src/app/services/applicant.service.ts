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

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  } 

  updateApplicant(id: string, updatedApplicant: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedApplicant);
  }
  
}
