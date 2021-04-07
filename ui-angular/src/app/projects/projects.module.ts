import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { RepoListComponent } from './repo-list/repo-list.component';
import { ProjectRepoService } from './services/project-repo.service';
import { ProjectService } from './services/project.service';
import { RepoService } from './services/repo.service';
import { ProjectFacade } from './store/project.facade';
import { RepoFacade } from './store/repo.facade';

@NgModule({
  declarations: [ProjectsComponent, ProjectListComponent, RepoListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
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
