import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JobListComponent } from './pages/job-list/job-list.component';
import { AddJobComponent } from './add-job/add-job.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { RegisterApplicantComponent } from './register-applicant/register-applicant.component';
import { LoginApplicantComponent } from './login-applicant/login-applicant.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'jobs', component: JobListComponent },
  { path: 'post-job', component: AddJobComponent },
  { path: 'jobs/:id', component: JobDetailComponent },
  { path: 'register', component: RegisterApplicantComponent },
  { path: 'login', component: LoginApplicantComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
