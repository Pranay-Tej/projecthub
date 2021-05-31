import { AuthFacade } from './auth.facade';
import { Router } from '@angular/router';
import { httpCallStatus } from './../../shared/constants/constants';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import { authActions } from './auth.actions';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private authFacade: AuthFacade,
    private router: Router,
    private store: Store
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      tap(() =>
        this.authFacade.setLoginOperationStatus(httpCallStatus.LOADING)
      ),
      mergeMap((action) =>
        this.authService
          .login({ identity: action.identity, password: action.password })
          .pipe(
            switchMap((data: any) => {
              this.authService.setJWT(data.jwt);
              return [authActions.loadUserInfo()];
            }),
            catchError((error) => {
              console.error(error);
              this.authFacade.setLoginOperationStatus(httpCallStatus.ERROR);
              return EMPTY;
            })
          )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register),
      tap(() =>
        this.authFacade.setRegisterOperationStatus(httpCallStatus.LOADING)
      ),
      mergeMap((action) =>
        this.authService
          .register({
            username: action.username,
            password: action.password,
            email: action.email,
          })
          .pipe(
            switchMap((data: any) => {
              this.authService.setJWT(data.jwt);
              this.authFacade.setRegisterOperationStatus(httpCallStatus.OK);
              return [authActions.loadUserInfo()];
            }),
            catchError((error) => {
              console.error(error);
              this.authFacade.setRegisterOperationStatus(httpCallStatus.ERROR);
              return EMPTY;
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
            this.authService.setLocalUser(data.username, data._id);
            this.authFacade.setLoginOperationStatus(httpCallStatus.OK);
            return [
              authActions.setUserId({ userId: data._id }),
              authActions.setUsername({ username: data.username }),
            ];
          }),
          catchError((error) => {
            console.error(error);
            this.authFacade.setLoginOperationStatus(httpCallStatus.ERROR);
            return EMPTY;
          })
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logout),
      tap(() => {
        this.authService.clearLocalCredentials();
        this.router.navigate(['/accounts/login']);
      }),
      switchMap(() => [authActions.setUserId(null)])
    )
  );
}
