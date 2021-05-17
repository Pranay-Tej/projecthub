import { authActions } from './../store/auth.actions';
import { authSelectors } from './../store/auth.selectors';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { httpCallStatus } from 'src/app/shared/constants/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginStatus$: string;
  loginForm: FormGroup = this.formBuilder.group({
    identity: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.required),
  });
  httpCallStatus = httpCallStatus;
  subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(authActions.loadUserInfo());

    this.subscriptions.add(
      this.store
        .select(authSelectors.loginStatus)
        .subscribe((data: any) => (this.loginStatus$ = data))
    );

    this.subscriptions.add(
      this.store.select(authSelectors.userId).subscribe((data) => {
        this.router.navigate(['/app']);
      })
    );
  }

  login() {
    this.store.dispatch(authActions.login({ ...this.loginForm.getRawValue() }));
  }

  logout() {
    this.store.dispatch(authActions.logout());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
