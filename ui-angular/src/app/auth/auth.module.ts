import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { AuthFacade } from './store/auth.facade';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthFacade,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AuthModule {}
