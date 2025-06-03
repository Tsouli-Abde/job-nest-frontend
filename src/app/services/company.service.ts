import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Job} from "../models/job";
import { Company } from '../models/company.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private baseUrl = 'http://localhost:8080/api/v1/companies';

  constructor(private http: HttpClient) {}

  register(company: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, company);
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  updateCompany(id: string, updatedCompany: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updatedCompany);
  }

  getCompanyJobs(companyId: string): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/${companyId}/jobs`);
  }

  getCompanyById(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}/${id}`);
  }
  
  checkUsernameAvailability(username: string) {
    return this.http.get<boolean>(`${this.baseUrl}/check-username`, {
      params: { username }
    });
  }  
}
