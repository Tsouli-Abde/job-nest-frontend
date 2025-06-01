import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { JobListComponent } from './pages/job-list/job-list.component';
import { AddJobComponent } from './pages/add-job/add-job.component';
import { JobDetailComponent } from './pages/job-detail/job-detail.component';
import { RegisterApplicantComponent } from './pages/register-applicant/register-applicant.component';
import { RegisterChoiceComponent } from './pages/register-choice/register-choice.component';
import { RegisterCompanyComponent } from './pages/register-company/register-company.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { ApplyFormComponent } from './pages/apply-form/apply-form.component';
import { ApplicantApplicationsComponent } from './pages/applicant-applications/applicant-applications.component';
import { CompanyJobsComponent } from './pages/company-jobs/company-jobs.component';
import { ApplicantProfileComponent } from './pages/applicant-profile/applicant-profile.component';
import { CompanyDetailComponent } from './pages/company-detail/company-detail.component';
import { BackButtonComponent } from './components/back-button/back-button.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent,
    JobListComponent,
    AddJobComponent,
    JobDetailComponent,
    RegisterApplicantComponent,
    RegisterChoiceComponent,
    RegisterCompanyComponent,
    LoginComponent,
    ProfileComponent,
    FooterComponent,
    ApplyFormComponent,
    ApplicantApplicationsComponent,
    CompanyJobsComponent,
    ApplicantProfileComponent,
    CompanyDetailComponent,
    BackButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
