import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apply-form',
  templateUrl: './apply-form.component.html',
  styleUrls: ['./apply-form.component.css']
})
export class ApplyFormComponent implements OnInit {
  applyForm!: FormGroup;
  jobId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService,
    private authService: AuthService
  ) { }

  applicant: any;

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    const role = this.authService.getRole();
    if (!user || role !== 'applicant') {
      console.log( "user.type = ", role)
      this.router.navigate(['/login']);
      return;
    }

    this.applicant = user;
    this.jobId = this.route.snapshot.paramMap.get('id')!;

    // Check if already applied
    this.applicationService.hasAlreadyApplied(this.applicant.id, this.jobId).subscribe({
      next: (applied) => {
        if (applied) {
          Swal.fire('Notice', 'You have already applied for this job.', 'info');
          this.router.navigate(['/jobs', this.jobId]);
        }
      }
    });

    this.applyForm = this.fb.group({
      coverLetter: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.applyForm.invalid) {
      this.applyForm.markAllAsTouched();
  
      Swal.fire({
        icon: 'warning',
        title: 'Cover letter is required.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
  
      return;
    }
  
    const applicant = this.authService.getCurrentUser();
    const application = {
      jobId: this.jobId,
      applicantId: applicant.id,
      coverLetter: this.applyForm.value.coverLetter
    };

    this.applicationService.submitApplication(application).subscribe({
      next: () => {
        Swal.fire('Success', 'Your application has been submitted!', 'success').then(() => {
          this.router.navigate(['/jobs', this.jobId]);
        });
      },
      error: () => {
        Swal.fire('Error', 'Failed to submit application', 'error');
      }
    });
  }  
}
