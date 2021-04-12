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
  private repo = new Subject();
  private saveOperation = new Subject();
  private deleteOperation = new Subject();
  private reloadRepoListTrigger = new Subject();

  repoList$ = this.repoList.asObservable();
  repo$ = this.repo.asObservable();
  saveOperation$ = this.saveOperation.asObservable();
  deleteOperation$ = this.deleteOperation.asObservable();
  reloadRepoListTrigger$ = this.reloadRepoListTrigger.asObservable();

  reloadRepoList() {
    this.reloadRepoListTrigger.next();
  }

  getAllRepos() {
    this.projectFacade.setSelectedProject('ALL');
    this.repoService
      .getAllRepos()
      .subscribe((data) => this.repoList.next(data));
  }

  getRepo(id: string) {
    this.repoService.getRepo(id).subscribe(
      (data) => this.repo.next(data),
      (error) => console.error(error.error)
    );
  }

  createRepo(repo) {
    this.saveOperation.next({ status: 'LOADING' });
    this.repoService.create(repo).subscribe(
      (data: any) => {
        this.saveOperation.next({ status: 'OK', id: data._id });
        // this.getAllRepos();
      },
      (error) => {
        console.error(error);
        this.saveOperation.next({ status: 'ERROR' });
      }
    );
  }

  updateRepo(repo, id) {
    this.saveOperation.next({ status: 'LOADING' });
    this.repoService.update(repo, id).subscribe(
      (res) => {
        this.saveOperation.next({ status: 'OK' });
        // this.getAllProjects();
      },
      (error) => {
        this.saveOperation.next({ status: 'ERROR' });
        console.error(error.error);
      }
    );
  }

  deleteRepo(id) {
    this.deleteOperation.next({ status: 'LOADING' });
    this.repoService.delete(id).subscribe(
      (data) => {
        // this.getAllProjects();
        this.deleteOperation.next({ status: 'OK' });
        this.reloadRepoList();
      },
      (error) => {
        console.error(error.error);
        this.deleteOperation.next({ status: 'ERROR' });
      }
    );
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
