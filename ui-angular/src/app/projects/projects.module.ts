import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { RepoListComponent } from './repo-list/repo-list.component';
import { ProjectRepoService } from './services/project-repo.service';
import { ProjectService } from './services/project.service';
import { RepoService } from './services/repo.service';
import { ProjectFacade } from './store/project.facade';
import { RepoFacade } from './store/repo.facade';
import { ProjectDialogComponent } from './project-list/project-dialog/project-dialog.component';

@NgModule({
  declarations: [ProjectsComponent, ProjectListComponent, RepoListComponent, ProjectDialogComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    ProjectService,
    ProjectFacade,
    RepoService,
    RepoFacade,
    ProjectRepoService,
  ],
})
export class ProjectsModule {}