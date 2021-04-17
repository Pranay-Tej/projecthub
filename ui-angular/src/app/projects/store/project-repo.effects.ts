import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ProjectRepoService } from './../services/project-repo.service';
import projectRepoActions from './project-repo.actions';
import repoActions from './repo.actions';

@Injectable()
export class ProjectRepoEffects {
  constructor(
    private actions$: Actions,
    private projectRepoService: ProjectRepoService
  ) {}

  loadProjectListOfRepo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectRepoActions.loadProjectListOfRepo),
      mergeMap((action: any) =>
        this.projectRepoService.getProjectListOfRepo(action.repoId).pipe(
          map((data: any) => data.map((projectRepo) => projectRepo.projectId)),
          switchMap((data) => [
            projectRepoActions.projectListOfRepoLoaded({
              projectListOfRepo: data,
            }),
          ])
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
