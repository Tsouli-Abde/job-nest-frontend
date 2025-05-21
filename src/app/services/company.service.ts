import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
