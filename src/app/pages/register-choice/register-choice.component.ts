import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-choice',
  templateUrl: './register-choice.component.html',
  styleUrls: ['./register-choice.component.css']
})
export class RegisterChoiceComponent {
  constructor(private router: Router) {}

  goToApplicant() {
    this.router.navigate(['/register-applicant']);
  }

  goToRecruiter() {
    this.router.navigate(['/register-company'])
  }
}
