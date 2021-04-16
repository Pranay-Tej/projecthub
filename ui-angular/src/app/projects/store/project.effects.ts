import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { httpCallStatus } from 'src/app/shared/constants/constants';
import { ProjectService } from './../services/project.service';
import projectActions from './project.actions';

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private store: Store
  ) {}

  loadProjectList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActions.loadProjectList),
      tap(() =>
        this.store.dispatch(
          projectActions.setLoadOperationStatus({
            status: httpCallStatus.LOADING,
          })
        )
      ),
      mergeMap(() =>
        this.projectService.getAllProjects().pipe(
          switchMap((data) => [
            projectActions.projectListLoaded({ projectList: data }),
            projectActions.setLoadOperationStatus({
              status: httpCallStatus.OK,
            }),
          ]),
          catchError((error) => {
            console.error(error);
            return [
              projectActions.setLoadOperationStatus({
                status: httpCallStatus.ERROR,
              }),
            ];
          })
        )
      )
    )
  );

  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActions.createProject),
      tap(() =>
        this.store.dispatch(
          projectActions.setSaveOperationStatus({
            status: httpCallStatus.LOADING,
          })
        )
      ),
      mergeMap((action: any) =>
        this.projectService.create(action.project).pipe(
          switchMap((data: any) => [
            projectActions.setSaveOperationStatus({
              status: httpCallStatus.OK,
            }),
            projectActions.loadProjectList(),
          ]),
          catchError((error) => {
            console.error(error);
            return [
              projectActions.setSaveOperationStatus({
                status: httpCallStatus.ERROR,
              }),
            ];
          })
        )
      )
    )
  );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActions.updateProject),
      tap(() =>
        this.store.dispatch(
          projectActions.setSaveOperationStatus({
            status: httpCallStatus.LOADING,
          })
        )
      ),
      mergeMap((action: any) =>
        this.projectService.update(action.project, action.id).pipe(
          switchMap((data: any) => [
            projectActions.setSaveOperationStatus({
              status: httpCallStatus.OK,
            }),
            projectActions.loadProjectList(),
          ]),
          catchError((error) => {
            console.error(error);
            return [
              projectActions.setSaveOperationStatus({
                status: httpCallStatus.ERROR,
              }),
            ];
          })
        )
      )
    )
  );

  loadProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActions.loadProject),
      mergeMap((action: any) =>
        this.projectService.getProject(action.id).pipe(
          switchMap((data: any) => [
            projectActions.projectLoaded({ project: data }),
          ]),
          catchError((error) => {
            console.log(error);
            return of(error);
          })
        )
      )
    )
  );

  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActions.deleteProject),
      tap(() =>
        this.store.dispatch(
          projectActions.setDeleteOperationStatus({
            status: httpCallStatus.LOADING,
          })
        )
      ),
      mergeMap((action: any) =>
        this.projectService.delete(action.id).pipe(
          switchMap((data) => [
            projectActions.setDeleteOperationStatus({
              status: httpCallStatus.OK,
            }),
            projectActions.loadProjectList(),
          ]),
          catchError((error) => {
            console.error(error);
            return [
              projectActions.setDeleteOperationStatus({
                status: httpCallStatus.ERROR,
              }),
            ];
          })
        )
      )
    )
  );
}
