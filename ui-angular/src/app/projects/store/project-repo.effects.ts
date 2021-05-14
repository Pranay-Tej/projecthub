import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { httpCallStatus } from 'src/app/shared/constants/constants';
import { ProjectRepoService } from './../services/project-repo.service';
import projectRepoActions from './project-repo.actions';
import { ProjectRepoFacade } from './project-repo.facade';
import repoActions from './repo.actions';

@Injectable()
export class ProjectRepoEffects {
  constructor(
    private actions$: Actions,
    private projectRepoFacade: ProjectRepoFacade,
    private projectRepoService: ProjectRepoService
  ) {}

  loadProjectListOfRepo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectRepoActions.loadProjectListOfRepo),
      tap(() =>
        this.projectRepoFacade.setProjectListLoadOperation(
          httpCallStatus.LOADING
        )
      ),
      mergeMap((action: any) =>
        this.projectRepoService.getProjectListOfRepo(action.repoId).pipe(
          map((data: any) => data.map((projectRepo) => projectRepo.projectId)),
          switchMap((data) => {
            this.projectRepoFacade.setProjectListLoadOperation(
              httpCallStatus.OK
            );
            return [
              projectRepoActions.projectListOfRepoLoaded({
                projectListOfRepo: data,
              }),
            ];
          }),
          catchError((error) => {
            console.error(error);
            this.projectRepoFacade.setProjectListLoadOperation(
              httpCallStatus.OK
            );
            return EMPTY;
          })
        )
      )
    )
  );

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectRepoActions.add),
      mergeMap((action: any) =>
        this.projectRepoService.create(action.projectId, action.repoId).pipe(
          switchMap((data) => [repoActions.reloadRepoList()]),
          catchError((error) => {
            console.error(error);
            return EMPTY;
          })
        )
      )
    )
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectRepoActions.remove),
      mergeMap((action: any) =>
        this.projectRepoService.remove(action.projectId, action.repoId).pipe(
          switchMap((data) => [repoActions.reloadRepoList()]),
          catchError((error) => {
            console.error(error);
            return EMPTY;
          })
        )
      )
    )
  );
}
