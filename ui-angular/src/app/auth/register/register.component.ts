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
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
} from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerOperationStatus$: string;
  // use this property for all fields which require form level validation
  errorMatcher: ErrorStateMatcher;
  hide = true;
  registerForm: FormGroup = this.formBuilder.group(
    {
      username: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9_-]*$/),
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      password: this.formBuilder.control('', Validators.required),
      confirmPassword: this.formBuilder.control('', Validators.required),
      email: this.formBuilder.control('', [
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
    },
    { validators: [passwordValidator] }
  );
  httpCallStatus = httpCallStatus;
  subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private authFacade: AuthFacade,
    private authService: AuthService
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

    this.subscriptions.add(
      this.registerForm
        .get('username')
        .valueChanges.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          filter((val: string) => val !== '' && val.length >= 3),
          // tap((val) => console.log(val)),
          tap((val) => this.checkUsername(val))
        )
        .subscribe()
    );

    this.subscriptions.add(
      this.registerForm
        .get('email')
        .valueChanges.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          filter((val: string) => val !== '' && val.length >= 5),
          // tap((val) => console.log(val)),
          tap((val) => this.checkEmail(val))
        )
        .subscribe()
    );
  }

  checkUsername(username: string) {
    this.authService.checkUsername(username).subscribe(
      (data) => {
        // console.log(data);
        this.registerForm
          .get('username')
          .setErrors({ usernameUnavailable: { value: true } });
      },
      (err) => {
        console.error(err.error);
      }
    );
  }

  checkEmail(email: string) {
    this.authService.checkEmail(email).subscribe(
      (data) => {
        // console.log(data);
        this.registerForm
          .get('email')
          .setErrors({ emailUnavailable: { value: true } });
      },
      (err) => {
        console.error(err.error);
      }
    );
  }

  register() {
    let { confirmPassword, email, ...credentials } =
      this.registerForm.getRawValue();
    console.log(credentials);
    if (email) {
      credentials = { ...credentials, email };
    }
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
