import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css'],
})
export class AddJobComponent {
  jobForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private router: Router
  ) {
    this.jobForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      responsibilities: ['', [Validators.required]],
      qualifications: ['', [Validators.required]],
      location: ['', [Validators.required]],
      salaryMin: [null, [Validators.required, Validators.min(0)]],
      salaryMax: [null, [Validators.required, Validators.min(0)]],
      type: ['', Validators.required],
      experienceLevel: ['', Validators.required],
    });
  }

  get f() {
    return this.jobForm.controls;
  }

  onSubmit() {
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      Swal.fire({
        toast: true,
        icon: 'error',
        title: 'Please review your job post',
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        background: '#fff0f0',
        iconColor: '#dc3545',
      });
      return;
    }

    this.jobService.createJob(this.jobForm.value).subscribe({
      next: () => {
        Swal.fire({
          toast: true,
          icon: 'success',
          title: 'Job posted successfully',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        }).then(() => this.router.navigate(['/jobs']));
      },
      error: () => {
        Swal.fire({
          toast: true,
          icon: 'error',
          title: 'Submission failed',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
      },
    });
  }
}
