import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register-choice',
  templateUrl: './register-choice.component.html',
  styleUrls: ['./register-choice.component.css']
})
export class RegisterChoiceComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  goToApplicant() {
    const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') || '/';
    this.router.navigate(['/register-applicant'], { queryParams: { redirectTo } });
  }

  goToRecruiter() {
    const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') || '/';
    this.router.navigate(['/register-company'], { queryParams: { redirectTo } });
  }
}
