import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { httpCallStatus } from 'src/app/shared/constants/constants';

@Injectable()
export class ProjectFacade {
  constructor() {}

  private projectListLoadOperation = new BehaviorSubject(httpCallStatus.OK);
  private projectLoadOperation = new BehaviorSubject(httpCallStatus.OK);
  private saveOperation = new Subject();
  private deleteOperation = new Subject();

  projectListLoadOperation$ = this.projectListLoadOperation.asObservable();
  projectLoadOperation$ = this.projectLoadOperation.asObservable();
  saveOperation$ = this.saveOperation.asObservable();
  deleteOperation$ = this.deleteOperation.asObservable();

  setProjectListLoadOperation(status) {
    this.projectListLoadOperation.next(status);
  }

  setProjectLoadOperation(status) {
    this.projectLoadOperation.next(status);
  }

  setSaveOperation(status) {
    this.saveOperation.next(status);
  }

  setDeleteOperation(status) {
    this.deleteOperation.next(status);
  }
}
