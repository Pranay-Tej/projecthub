import { authActions } from './store/auth.actions';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      // withCredentials: true /* For cookie based method */
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('JWT') || ''}`,
      },
    });
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // if any api request is unauthorized, perform logout
          this.store.dispatch(authActions.logout());
          return throwError(error);
        } else {
          return throwError(error);
        }
      })
    );
  }
}
