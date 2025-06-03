import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { ApplicantService } from '../services/applicant.service';
import { CompanyService } from '../services/company.service';
import { debounceTime, map, switchMap, catchError, of } from 'rxjs';

export function companyUsernameAvailableValidator(companyService: CompanyService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) return of(null);
    return of(control.value).pipe(
      debounceTime(500),
      switchMap(username =>
        companyService.checkUsernameAvailability(username).pipe(
          map(isAvailable => (isAvailable ? null : { usernameTaken: true })),
          catchError(() => of(null))
        )
      )
    );
  };
}

export function usernameAvailableValidator(applicantService: ApplicantService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) return of(null);
    return of(control.value).pipe(
      debounceTime(500),
      switchMap(username =>
        applicantService.checkUsernameAvailability(username).pipe(
          map(isAvailable => (isAvailable ? null : { usernameTaken: true })),
          catchError(() => of(null))
        )
      )
    );
  };
}
