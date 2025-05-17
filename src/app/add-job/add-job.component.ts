import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../services/job.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent {
  jobForm: FormGroup;

  constructor(private fb: FormBuilder, private jobService: JobService, private router: Router) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      responsibilities: ['', Validators.required],
      qualifications: ['', Validators.required],
      location: ['', Validators.required],
      salaryMin: [null, [Validators.required, Validators.min(0)]],
      salaryMax: [null, [Validators.required, Validators.min(0)]],
      type: ['', Validators.required],
      experienceLevel: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
  
      Swal.fire({
        icon: 'error',
        title: 'Please review your post',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#fff0f0',
        iconColor: '#dc3545',
      });
  
      return;
    }
  
    this.jobService.createJob(this.jobForm.value).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Job posted!',
          text: 'Your offer has been successfully submitted.',
          confirmButtonColor: '#6d7549',
        });
        this.router.navigate(['/jobs']);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          text: 'We could not submit your job post.',
          confirmButtonColor: '#dc3545',
        });
      },
    });
  }  
}
