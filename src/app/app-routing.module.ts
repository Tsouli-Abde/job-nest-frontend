import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JobListComponent } from './pages/job-list/job-list.component';
import { AddJobComponent } from './pages/add-job/add-job.component';
import { JobDetailComponent } from './pages/job-detail/job-detail.component';
import { RegisterApplicantComponent } from './pages/register-applicant/register-applicant.component';
import {RegisterChoiceComponent} from "./pages/register-choice/register-choice.component";
import {RegisterCompanyComponent} from "./pages/register-company/register-company.component";
import {LoginComponent} from "./pages/login/login.component";
import { ProfileComponent } from './pages/profile/profile.component';
import {FooterComponent} from "./components/footer/footer.component";
import { ApplyFormComponent } from './pages/apply-form/apply-form.component';
import { ApplicantApplicationsComponent } from './pages/applicant-applications/applicant-applications.component';
import {CompanyJobsComponent} from "./pages/company-jobs/company-jobs.component";
import {ApplicantProfileComponent} from "./pages/applicant-profile/applicant-profile.component";
import { CompanyDetailComponent } from './pages/company-detail/company-detail.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'jobs', component: JobListComponent },
  { path: 'post-job', component: AddJobComponent },
  { path: 'jobs/:id', component: JobDetailComponent },
  { path: 'register-applicant', component: RegisterApplicantComponent },
  { path: 'register-choice', component: RegisterChoiceComponent },
  { path: 'register-company', component: RegisterCompanyComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'login', component: LoginComponent, data: { userType: 'applicant' } },
  { path: 'login-company', component: LoginComponent, data: { userType: 'company' } },
  { path: 'jobs/:id/apply', component: ApplyFormComponent },
  { path: 'applications', component: ApplicantApplicationsComponent },
  { path: 'company-jobs', component: CompanyJobsComponent },
  { path: 'applicant-profile/:applicationId', component: ApplicantProfileComponent },
  { path: 'companies/:id', component: CompanyDetailComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
