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
    return this.authService.getUser().pipe(
      switchMap((data: any) => {
        this.authService.setLocalUser(data._id);
        this.store.dispatch(authActions.setUser({ user: data._id }));
        return of(true);
      }),
      catchError((e) => {
        this.authService.clearLocalUser();
        this.store.dispatch(authActions.setUser(null));
        this.router.navigate(['/accounts/login']);
        return of(false);
      })
    );
  }
}
