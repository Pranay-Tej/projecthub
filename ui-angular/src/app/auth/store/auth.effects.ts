import { Router } from '@angular/router';
import { httpCallStatus } from './../../shared/constants/constants';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import { authActions } from './auth.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      tap(() => {
        this.store.dispatch(
          authActions.setLoginStatus({ status: httpCallStatus.LOADING })
        );
      }),
      mergeMap((action) =>
        this.authService
          .login({ email: action.email, password: action.password })
          .pipe(
            switchMap((data: any) => {
              this.authService.setJWT(data.jwt);
              return [authActions.loadUserInfo()];
            }),
            catchError((error) => {
              console.error(error);
              return [
                authActions.setLoginStatus({ status: httpCallStatus.ERROR }),
              ];
            })
          )
      )
    )
  );

  loadUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loadUserInfo),
      mergeMap(() =>
        this.authService.getUser().pipe(
          switchMap((data: any) => {
            this.authService.setLocalUser(data._id);
            return [
              authActions.setUser({ user: data._id }),
              authActions.setLoginStatus({ status: httpCallStatus.OK }),
            ];
          }),
          catchError((error) => {
            console.error(error);
            return [
              authActions.setLoginStatus({ status: httpCallStatus.ERROR }),
            ];
          })
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logout),
      mergeMap(() =>
        this.authService.logout().pipe(
          switchMap(() => {
            return [
              authActions.setUser(null),
              authActions.setLoginStatus({ status: httpCallStatus.OK }),
            ];
          }),
          tap(() => {
            this.authService.clearLocalCredentials();
            this.router.navigate(['/']);
          })
        )
      )
    )
  );
}
