import { httpCallStatus } from 'src/app/shared/constants/constants';
import { ProjectRepoService } from './../services/project-repo.service';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { RepoService } from '../services/repo.service';

@Injectable()
export class RepoFacade {
  constructor() {}

  private repoListLoadOperation = new BehaviorSubject(httpCallStatus.OK);
  private repoLoadOperation = new BehaviorSubject(httpCallStatus.OK);
  private saveOperation = new Subject();
  private deleteOperation = new Subject();

  repoListLoadOperation$ = this.repoListLoadOperation.asObservable();
  repoLoadOperation$ = this.repoLoadOperation.asObservable();
  saveOperation$ = this.saveOperation.asObservable();
  deleteOperation$ = this.deleteOperation.asObservable();

  setRepoListLoadOperation(status) {
    this.repoListLoadOperation.next(status);
  }

  setRepoLoadOperation(status) {
    this.repoLoadOperation.next(status);
  }

  setSaveOperation(status) {
    this.saveOperation.next(status);
  }

  setDeleteOperation(status) {
    this.deleteOperation.next(status);
  }
}
