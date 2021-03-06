import { LOCAL_KEYS } from './../shared/constants/constants';
import { authActions } from './store/auth.actions';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // if there is no local user or jwt
    if (
      !localStorage.getItem(LOCAL_KEYS.USERNAME) ||
      !localStorage.getItem(LOCAL_KEYS.USER_ID) ||
      !localStorage.getItem(LOCAL_KEYS.JWT)
    ) {
      this.router.navigate(['/accounts/login']);
      return of(false);
    } else {
      return of(true);
      // return this.authService.getUser().pipe(
      //   switchMap((data: any) => {
      //     this.authService.setLocalUser(data._id);
      //     this.store.dispatch(authActions.setUserId({ userId: data._id }));
      // return of(true);
      //   }),
      //   catchError((e) => {
      //     this.authService.clearLocalCredentials();
      //     this.store.dispatch(authActions.setUserId(null));
      //     this.router.navigate(['/accounts/login']);
      // return of(false);
      //   })
      // );
    }
  }
}
