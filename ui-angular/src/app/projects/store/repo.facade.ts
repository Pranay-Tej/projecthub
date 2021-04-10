import { ProjectFacade } from './project.facade';
import { ProjectRepoService } from './../services/project-repo.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RepoService } from '../services/repo.service';

@Injectable()
export class RepoFacade {
  constructor(
    private repoService: RepoService,
    private projectRepoService: ProjectRepoService,
    private projectFacade: ProjectFacade
  ) {}

  private repoList = new Subject();

  repoList$ = this.repoList.asObservable();

  getAllRepos() {
    this.projectFacade.setSelectedProject('all');
    this.repoService
      .getAllRepos()
      .subscribe((data) => this.repoList.next(data));
  }

  getRepoListOfProject(projectId: string) {
    this.projectFacade.setSelectedProject(projectId);
    this.projectRepoService
      .getRepoListOfProject(projectId)
      .subscribe((data: any) => {
        let repoListOfProject = data.map((projectRepo) => projectRepo.repoId);
        this.repoList.next(repoListOfProject);
      });
  }
}
