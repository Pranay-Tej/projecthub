import { AuthFacade } from './../store/auth.facade';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginStatus: string;

  constructor(
    private formBuilder: FormBuilder,
    private authFacade: AuthFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control('', Validators.required),
    });

    this.authFacade.loginStatus$.subscribe(
      (data: any) => (this.loginStatus = data.status)
    );

    this.authFacade.user$.subscribe((data) => {
      // console.log(data);
      this.router.navigate(['/app']);
    });

    this.authFacade.getUser();
  }

  login() {
    // console.log(this.loginForm.getRawValue());
    this.authFacade.login(this.loginForm.getRawValue());
  }

  logout() {
    this.authFacade.logout();
  }
}
