import { authActions } from './../store/auth.actions';
import { authSelectors } from './../store/auth.selectors';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { httpCallStatus } from 'src/app/shared/constants/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '../store/auth.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginOperationStatus$: string;
  hide = true;
  loginForm: FormGroup = this.formBuilder.group({
    identity: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.required),
  });
  httpCallStatus = httpCallStatus;
  subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(authActions.loadUserInfo());

    this.subscriptions.add(
      this.authFacade.loginOperationStatus$.subscribe(
        (status: string) => (this.loginOperationStatus$ = status)
      )
    );

    this.subscriptions.add(
      this.store.select(authSelectors.userId).subscribe((data) => {
        if (data) {
          this.router.navigate(['/app']);
        }
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
