import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { httpCallStatus } from 'src/app/shared/constants/constants';

@Injectable()
export class ProjectRepoFacade {
  constructor() {}
  private projectListOfRepoLoadOperation = new BehaviorSubject(
    httpCallStatus.OK
  );

  projectListOfRepoLoadOperation$ =
    this.projectListOfRepoLoadOperation.asObservable();

  setProjectListLoadOperation(status) {
    this.projectListOfRepoLoadOperation.next(status);
  }
}
