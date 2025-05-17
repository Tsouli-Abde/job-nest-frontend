import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';  // <<== ADD THIS
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { JobListComponent } from './pages/job-list/job-list.component';
import { AddJobComponent } from './add-job/add-job.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent,
    JobListComponent,
    AddJobComponent
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
