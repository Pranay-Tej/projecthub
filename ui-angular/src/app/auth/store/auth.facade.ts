import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  constructor() {}

  private registerOperationStatus = new Subject();
  private loginOperationStatus = new Subject();

  registerOperationStatus$ = this.registerOperationStatus.asObservable();
  loginOperationStatus$ = this.loginOperationStatus.asObservable();

  setRegisterOperationStatus(status) {
    this.registerOperationStatus.next(status);
  }

  setLoginOperationStatus(status) {
    this.loginOperationStatus.next(status);
  }
}
