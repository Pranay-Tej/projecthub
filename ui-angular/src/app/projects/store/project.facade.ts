import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProjectService } from '../services/project.service';

@Injectable()
export class ProjectFacade {
  constructor(private projectService: ProjectService) {}

  private projectList = new Subject();
  private selectedProject = new Subject();

  projectList$ = this.projectList.asObservable();
  selectedProject$ = this.selectedProject.asObservable();

  getAllProjects() {
    this.projectService
      .getAllProjects()
      .subscribe((data) => this.projectList.next(data));
  }

  setSelectedProject(projectId: string) {
    this.selectedProject.next(projectId);
  }

  createProject(project) {
    this.projectService.create(project).subscribe(
      (res) => {
        // if (res.status === 201) {
        //   console.log('success');
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

        //throw error;   //You can also throw the error to a global error handler
      }
    );
  }
}
