import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { RepoListComponent } from './repo-list/repo-list.component';


@NgModule({
  declarations: [ProjectsComponent, ProjectListComponent, RepoListComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
