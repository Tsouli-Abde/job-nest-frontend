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
    if (!user || user.role !== 'applicant') {
      this.router.navigate(['/login']); // sécurité
      return;
    }

    this.applicant = user;
    this.jobId = this.route.snapshot.paramMap.get('id')!;

    this.applyForm = this.fb.group({
      coverLetter: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.applyForm.invalid) return;

    const applicant = this.authService.getCurrentUser();
    const application = {
      jobId: this.jobId,
      applicantId: applicant.id,
      coverLetter: this.applyForm.value.coverLetter
    };

    this.applicationService.submitApplication(application).subscribe({
      next: () => {
        Swal.fire('Success', 'Your application has been submitted!', 'success');
        this.applyForm.reset();
      },
      error: () => {
        Swal.fire('Error', 'Failed to submit application', 'error');
      }
    });
  }
}
