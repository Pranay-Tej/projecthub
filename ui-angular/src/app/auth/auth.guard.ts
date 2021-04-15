import { AuthFacade } from './store/auth.facade';
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

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    // private authFacade: AuthFacade,
    private router: Router
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
      switchMap((data) => {
        // console.log(data);
        return of(true);
      }),
      catchError((e) => {
        // console.error(e);
        this.router.navigate(['/accounts/login']);
        return of(false);
      })
    );
    // return this.authFacade.getLocalUser() !== undefined;
  }
}
