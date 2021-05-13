import { AuthInterceptor } from './../auth/auth.interceptor';
import { ProjectRepoEffects } from './store/project-repo.effects';
import { ProjectEffects } from './store/project.effects';
import { StoreModule } from '@ngrx/store';
// import { ProjectRepoFacade } from './store/project-repo.facade';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { DeleteProjectDialogComponent } from './project-list/delete-project-dialog/delete-project-dialog.component';
import { ProjectDialogComponent } from './project-list/project-dialog/project-dialog.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { RepoListComponent } from './repo-list/repo-list.component';
import { ProjectRepoService } from './services/project-repo.service';
import { ProjectService } from './services/project.service';
import { RepoService } from './services/repo.service';
import { ProjectFacade } from './store/project.facade';
import { RepoFacade } from './store/repo.facade';
import { EditRepoProjectsDialogComponent } from './repo-list/edit-repo-projects-dialog/edit-repo-projects-dialog.component';
import { RepoDialogComponent } from './repo-list/repo-dialog/repo-dialog.component';
import { DeleteRepoDialogComponent } from './repo-list/delete-repo-dialog/delete-repo-dialog.component';
import { projectFeatureKey, projectReducer } from './store/project.reducer';
import { repoFeatureKey, repoReducer } from './store/repo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RepoEffects } from './store/repo.effects';
import {
  projectRepoFeatureKey,
  projectRepoReducer,
} from './store/project-repo.reducer';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectListComponent,
    RepoListComponent,
    ProjectDialogComponent,
    DeleteProjectDialogComponent,
    EditRepoProjectsDialogComponent,
    RepoDialogComponent,
    DeleteRepoDialogComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(projectFeatureKey, projectReducer),
    StoreModule.forFeature(repoFeatureKey, repoReducer),
    StoreModule.forFeature(projectRepoFeatureKey, projectRepoReducer),
    EffectsModule.forFeature([ProjectEffects, RepoEffects, ProjectRepoEffects]),
  ],
  providers: [
    ProjectService,
    ProjectFacade,
    RepoService,
    RepoFacade,
    ProjectRepoService,
    // ProjectRepoFacade,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class ProjectsModule {}
