import { ProjectFacade } from './store/project.facade';
import { ProjectService } from './services/project.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { RepoListComponent } from './repo-list/repo-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RepoService } from './services/repo.service';
import { RepoFacade } from './store/repo.facade';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProjectsComponent, ProjectListComponent, RepoListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [ProjectService, ProjectFacade, RepoService, RepoFacade],
})
export class ProjectsModule {}
