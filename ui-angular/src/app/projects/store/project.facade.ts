import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProjectRepoService } from '../services/project-repo.service';
import { ProjectService } from '../services/project.service';

@Injectable()
export class ProjectFacade {
  constructor(
    private projectService: ProjectService,
    private projectRepoService: ProjectRepoService
  ) {}

  private projectList = new Subject();
  private projectListOfRepo = new Subject();
  private project = new Subject();
  private selectedProject = new Subject();
  private saveOperation = new Subject();
  private deleteOperation = new Subject();

  projectList$ = this.projectList.asObservable();
  projectListOfRepo$ = this.projectListOfRepo.asObservable();
  project$ = this.project.asObservable();
  selectedProject$ = this.selectedProject.asObservable();
  saveOperation$ = this.saveOperation.asObservable();
  deleteOperation$ = this.deleteOperation.asObservable();

  getAllProjects() {
    this.projectService
      .getAllProjects()
      .subscribe((data) => this.projectList.next(data));
  }

  getProject(id: string) {
    this.projectService.getProject(id).subscribe(
      (data) => this.project.next(data),
      (error) => console.error(error)
    );
  }

  setSelectedProject(projectId: string) {
    this.selectedProject.next(projectId);
  }

  createProject(project) {
    this.saveOperation.next('LOADING');
    this.projectService.create(project).subscribe(
      (res) => {
        // if (res.status === 201) {
        //   console.log('success');
        this.saveOperation.next('OK');
        this.getAllProjects();
        // return 'success';
        // } else {
        //   // return res.body
        //   console.log('error', res);
        // }
      },
      (error) => {
        //Error callback
        console.error(error.error);
        // this.errorMessage = error;
        // this.loading = false;
        this.saveOperation.next('ERROR');
        //throw error;   //You can also throw the error to a global error handler
      }
    );
  }

  updateProject(project, id) {
    this.saveOperation.next('LOADING');
    this.projectService.update(project, id).subscribe(
      (res) => {
        this.saveOperation.next('OK');
        this.getAllProjects();
      },
      (error) => {
        this.saveOperation.next('ERROR');
        console.error(error.error);
      }
    );
  }

  deleteProject(id) {
    this.deleteOperation.next('LOADING');
    this.projectService.delete(id).subscribe(
      (data) => {
        this.getAllProjects();
        this.deleteOperation.next('OK');
      },
      (error) => {
        console.error(error.error);
        this.deleteOperation.next('ERROR');
      }
    );
  }
}
