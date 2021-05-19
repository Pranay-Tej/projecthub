import { authActions } from './../store/auth.actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { httpCallStatus } from 'src/app/shared/constants/constants';
import { AuthFacade } from '../store/auth.facade';
import passwordValidator from './password.validator';
import { authSelectors } from '../store/auth.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerOperationStatus$: string;
  // use this property for all fields which require form level validation
  errorMatcher: ErrorStateMatcher;
  registerForm: FormGroup = this.formBuilder.group(
    {
      username: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9_-]*$/),
      ]),
      password: this.formBuilder.control('', Validators.required),
      confirmPassword: this.formBuilder.control('', Validators.required),
      email: this.formBuilder.control('', Validators.email),
    },
    { validators: [passwordValidator] }
  );
  httpCallStatus = httpCallStatus;
  subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private authFacade: AuthFacade
  ) {
    this.errorMatcher = new CrossFieldErrorMatcher();
  }

  ngOnInit() {
    this.subscriptions.add(
      this.authFacade.registerOperationStatus$.subscribe(
        (status: string) => (this.registerOperationStatus$ = status)
      )
    );

    this.subscriptions.add(
      this.store.select(authSelectors.userId).subscribe((data) => {
        console.log(data);
        if (data) {
          this.router.navigate(['/app']);
        }
      })
    );
  }

  register() {
    const { confirmPassword, ...credentials } = this.registerForm.getRawValue();
    console.log(credentials);
    this.store.dispatch(authActions.register({ ...credentials }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(
    control: AbstractControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return control.touched && (control.errors !== null || form.errors !== null);
  }
}
