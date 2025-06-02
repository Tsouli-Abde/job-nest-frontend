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
import { AuthGuard } from './guards/auth.guard';
import { ApplicantGuard } from './guards/applicant.guard';
import { CompanyGuard } from './guards/company.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'jobs', component: JobListComponent },
  { path: 'jobs/:id', component: JobDetailComponent },
  { path: 'register-applicant', component: RegisterApplicantComponent },
  { path: 'register-choice', component: RegisterChoiceComponent },
  { path: 'register-company', component: RegisterCompanyComponent },
  { path: 'login', component: LoginComponent, data: { userType: 'applicant' } },
  { path: 'login-company', component: LoginComponent, data: { userType: 'company' } },
  { path: 'companies/:id', component: CompanyDetailComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'post-job', component: AddJobComponent, canActivate: [CompanyGuard] },
  { path: 'jobs/:id/apply', component: ApplyFormComponent, canActivate: [ApplicantGuard] },
  { path: 'applications', component: ApplicantApplicationsComponent, canActivate: [ApplicantGuard] },
  { path: 'company-jobs', component: CompanyJobsComponent, canActivate: [CompanyGuard] },
  { path: 'applicant-profile/:applicationId', component: ApplicantProfileComponent, canActivate: [CompanyGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
