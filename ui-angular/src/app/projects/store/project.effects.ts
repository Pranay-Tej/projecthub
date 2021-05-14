import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { httpCallStatus } from 'src/app/shared/constants/constants';
import { ProjectService } from './../services/project.service';
import projectActions from './project.actions';
import { ProjectFacade } from './project.facade';

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private projectFacade: ProjectFacade
  ) {}

  loadProjectList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActions.loadProjectList),
      tap(() =>
        this.projectFacade.setProjectListLoadOperation(httpCallStatus.LOADING)
      ),
      mergeMap(() =>
        this.projectService.getAllProjects().pipe(
          switchMap((data) => {
            this.projectFacade.setProjectListLoadOperation(httpCallStatus.OK);
            return [projectActions.projectListLoaded({ projectList: data })];
          }),
          catchError((error) => {
            console.error(error);
            this.projectFacade.setProjectListLoadOperation(
              httpCallStatus.ERROR
            );
            return EMPTY;
          })
        )
      )
    )
  );

  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActions.createProject),
      tap(() => this.projectFacade.setSaveOperation(httpCallStatus.LOADING)),
      mergeMap((action: any) =>
        this.projectService.create(action.project).pipe(
          switchMap((data: any) => {
            this.projectFacade.setSaveOperation(httpCallStatus.OK);
            return [projectActions.loadProjectList()];
          }),
          catchError((error) => {
            console.error(error);
            this.projectFacade.setSaveOperation(httpCallStatus.ERROR);
            return EMPTY;
          })
        )
      )
    )
  );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActions.updateProject),
      tap(() => this.projectFacade.setSaveOperation(httpCallStatus.LOADING)),
      mergeMap((action: any) =>
        this.projectService.update(action.project, action.id).pipe(
          switchMap((data: any) => {
            this.projectFacade.setSaveOperation(httpCallStatus.OK);
            return [projectActions.loadProjectList()];
          }),
          catchError((error) => {
            console.error(error);
            this.projectFacade.setSaveOperation(httpCallStatus.ERROR);
            return EMPTY;
          })
        )
      )
    )
  );

  loadProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActions.loadProject),
      tap(() =>
        this.projectFacade.setProjectLoadOperation(httpCallStatus.LOADING)
      ),
      mergeMap((action: any) =>
        this.projectService.getProject(action.id).pipe(
          switchMap((data: any) => {
            this.projectFacade.setProjectLoadOperation(httpCallStatus.OK);
            return [projectActions.projectLoaded({ project: data })];
          }),
          catchError((error) => {
            console.error(error);
            this.projectFacade.setProjectLoadOperation(httpCallStatus.ERROR);
            return EMPTY;
          })
        )
      )
    )
  );

  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActions.deleteProject),
      tap(() => this.projectFacade.setDeleteOperation(httpCallStatus.LOADING)),
      mergeMap((action: any) =>
        this.projectService.delete(action.id).pipe(
          switchMap((data) => {
            this.projectFacade.setDeleteOperation(httpCallStatus.OK);
            return [projectActions.loadProjectList()];
          }),
          catchError((error) => {
            console.error(error);
            this.projectFacade.setDeleteOperation(httpCallStatus.ERROR);
            return EMPTY;
          })
        )
      )
    )
  );
}
