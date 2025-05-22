import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'job-nest-frontend';
  constructor(public router: Router) {}
  showFooter(): boolean {
    return this.router.url === '/' || this.router.url === '/home';
  }
}
