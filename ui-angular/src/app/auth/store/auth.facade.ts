import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  constructor() {}

  private registerOperationStatus = new Subject();

  registerOperationStatus$ = this.registerOperationStatus.asObservable();

  setRegisterOperationStatus(status) {
    this.registerOperationStatus.next(status);
  }
}
