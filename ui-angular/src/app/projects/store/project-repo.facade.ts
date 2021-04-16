import { RepoFacade } from './repo.facade';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProjectRepoService } from './../services/project-repo.service';

@Injectable()
export class ProjectRepoFacade {
  constructor(
    private projectRepoService: ProjectRepoService,
    private repoFacade: RepoFacade
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
        // this.repoFacade.
        // this.selectedProject.
      });
  }

  add(projectId: string, repoId: string) {
    this.projectRepoService.create(projectId, repoId).subscribe((data) => {
      this.repoFacade.reloadRepoList();
      console.log(data);
    });
  }

  remove(projectId: string, repoId: string) {
    this.projectRepoService.remove(projectId, repoId).subscribe((data) => {
      this.repoFacade.reloadRepoList();
      console.log(data);
    });
  }
}
