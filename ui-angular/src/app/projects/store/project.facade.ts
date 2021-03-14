import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProjectService } from '../services/project.service';

@Injectable()
export class ProjectFacade {
  constructor(private projectService: ProjectService) {}

  private projectList = new Subject();

  projectList$ = this.projectList.asObservable();

  getAllProjects() {
    this.projectService
      .getAllProjects()
      .subscribe((data) => this.projectList.next(data));
  }
}
