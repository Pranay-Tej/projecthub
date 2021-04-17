import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProjectRepoService } from './../services/project-repo.service';
import repoActions from './repo.actions';

@Injectable()
export class ProjectRepoFacade {
  constructor(
    private projectRepoService: ProjectRepoService,
    private store: Store
  ) {}

  private projectListOfRepo = new Subject();

  projectListOfRepo$ = this.projectListOfRepo.asObservable();

  getProjectListOfRepo(repoId: string) {
    this.projectRepoService
      .getProjectListOfRepo(repoId)
      .subscribe((data: any) => {
        let projectListOfRepo = data.map(
          (projectRepo) => projectRepo.projectId
        );
        this.projectListOfRepo.next(projectListOfRepo);
      });
  }

  add(projectId: string, repoId: string) {
    this.projectRepoService.create(projectId, repoId).subscribe((data) => {
      this.store.dispatch(repoActions.reloadRepoList());
    });
  }

  remove(projectId: string, repoId: string) {
    this.projectRepoService.remove(projectId, repoId).subscribe((data) => {
      this.store.dispatch(repoActions.reloadRepoList());
    });
  }
}
