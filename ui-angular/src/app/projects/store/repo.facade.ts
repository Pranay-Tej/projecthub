import { ProjectRepoService } from './../services/project-repo.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RepoService } from '../services/repo.service';

@Injectable()
export class RepoFacade {
  constructor() {}

  private saveOperation = new Subject();
  private deleteOperation = new Subject();

  saveOperation$ = this.saveOperation.asObservable();
  deleteOperation$ = this.deleteOperation.asObservable();
}
