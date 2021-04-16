import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ProjectFacade {
  constructor() {}

  private projectListOfRepo = new Subject();
  private saveOperation = new Subject();
  private deleteOperation = new Subject();

  projectListOfRepo$ = this.projectListOfRepo.asObservable();
  saveOperation$ = this.saveOperation.asObservable();
  deleteOperation$ = this.deleteOperation.asObservable();
}
