import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from './../auth.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private user = new Subject();
  private loginStatus = new Subject();

  user$ = this.user.asObservable();
  loginStatus$ = this.loginStatus.asObservable();

  constructor(private authService: AuthService, private router: Router) {}

  getLocalUser() {
    return localStorage.getItem('USER');
  }

  setLocalUser(user) {
    localStorage.setItem('USER', user);
  }

  clearLocalUser() {
    localStorage.removeItem('USER');
  }

  getUser() {
    this.authService.getUser().subscribe(
      (data: any) => {
        // console.log(data);
        this.user.next(data._id);
        this.setLocalUser(data._id);
      },
      (error) => console.error(error)
    );
  }

  login(loginCredentials) {
    this.loginStatus.next({ status: 'LOADING' });
    this.authService.login(loginCredentials).subscribe(
      (data) => {
        // console.log(data);
        this.loginStatus.next({ status: 'OK' });
        this.getUser();
      },
      (error) => console.error(error)
    );
  }

  logout() {
    this.authService.logout().subscribe((data) => {
      console.log(data);
      this.clearLocalUser();
      this.user.next(null);
      this.router.navigate(['/']);
    });
  }
}
