import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent {
  @Input() text: string = 'Back';
  @Input() iconOnly: boolean = false;
  @Input() color: string = 'btn-outline-secondary';
  @Input() customClass: string = '';

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
