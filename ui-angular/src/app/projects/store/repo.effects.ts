import { authSelectors } from 'src/app/auth/store/auth.selectors';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { httpCallStatus } from 'src/app/shared/constants/constants';
import { ProjectRepoService } from './../services/project-repo.service';
import { RepoService } from './../services/repo.service';
import projectSelectors from './project.selectors';
import repoActions from './repo.actions';
import { RepoFacade } from './repo.facade';

@Injectable()
export class RepoEffects {
  constructor(
    private actions$: Actions,
    private projectRepoService: ProjectRepoService,
    private repoService: RepoService,
    private store: Store,
    private repoFacade: RepoFacade
  ) {}

  reloadRepoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(repoActions.reloadRepoList),
      withLatestFrom(this.store.select(projectSelectors.selectedProjectId)),
      switchMap(([action, selectedProjectId]) => {
        // console.log(selectedProjectId);
        if (selectedProjectId === 'ALL') {
          return [repoActions.loadRepoList()];
        } else {
          return [repoActions.loadRepoListOfProject()];
        }
      })
    )
  );

  loadRepoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(repoActions.loadRepoList),
      withLatestFrom(this.store.select(authSelectors.userId)),
      tap(() =>
        this.repoFacade.setRepoListLoadOperation(httpCallStatus.LOADING)
      ),
      mergeMap(([action, userId]) =>
        this.repoService.getAllRepos(userId).pipe(
          switchMap((data) => {
            this.repoFacade.setRepoListLoadOperation(httpCallStatus.OK);
            return [repoActions.repoListLoaded({ repoList: data })];
          }),
          catchError((error) => {
            console.error(error);
            this.repoFacade.setRepoListLoadOperation(httpCallStatus.ERROR);
            return EMPTY;
          })
        )
      )
    )
  );

  loadRepoListOfProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(repoActions.loadRepoListOfProject),
      tap(() =>
        this.repoFacade.setRepoListLoadOperation(httpCallStatus.LOADING)
      ),
      withLatestFrom(this.store.select(projectSelectors.selectedProjectId)),
      mergeMap(([action, selectedProjectId]) =>
        this.projectRepoService.getRepoListOfProject(selectedProjectId).pipe(
          map((data: any) => data.map((projectRepo) => projectRepo.repoId)),
          switchMap((data: any) => {
            // console.log(data);
            this.repoFacade.setRepoListLoadOperation(httpCallStatus.OK);
            return [repoActions.repoListLoaded({ repoList: data })];
          }),
          catchError((error) => {
            console.error(error);
            this.repoFacade.setRepoListLoadOperation(httpCallStatus.ERROR);
            return EMPTY;
          })
        )
      )
    )
  );

  createRepo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(repoActions.createRepo),
      tap(() =>
        this.repoFacade.setSaveOperation({ status: httpCallStatus.LOADING })
      ),
      mergeMap((action: any) =>
        this.repoService.create(action.repo).pipe(
          switchMap((data: any) => {
            this.repoFacade.setSaveOperation({
              status: httpCallStatus.OK,
              id: data._id,
            });
            return [repoActions.reloadRepoList()];
          }),
          catchError((error) => {
            console.error(error);
            this.repoFacade.setSaveOperation({ status: httpCallStatus.ERROR });
            return EMPTY;
          })
        )
      )
    )
  );

  updateRepo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(repoActions.updateRepo),
      tap(() =>
        this.repoFacade.setSaveOperation({ status: httpCallStatus.LOADING })
      ),
      mergeMap((action: any) =>
        this.repoService.update(action.repo, action.id).pipe(
          switchMap((data: any) => {
            this.repoFacade.setSaveOperation({ status: httpCallStatus.OK });
            return [repoActions.reloadRepoList()];
          }),
          catchError((error) => {
            console.error(error);
            this.repoFacade.setSaveOperation({ status: httpCallStatus.ERROR });
            return EMPTY;
          })
        )
      )
    )
  );

  loadRepo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(repoActions.loadRepo),
      tap(() => this.repoFacade.setRepoLoadOperation(httpCallStatus.LOADING)),
      mergeMap((action: any) =>
        this.repoService.getRepo(action.id).pipe(
          switchMap((data: any) => {
            this.repoFacade.setRepoLoadOperation(httpCallStatus.OK);
            return [repoActions.repoLoaded({ repo: data })];
          }),
          catchError((error) => {
            console.error(error);
            this.repoFacade.setRepoLoadOperation(httpCallStatus.ERROR);
            return EMPTY;
          })
        )
      )
    )
  );

  deleteRepo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(repoActions.deleteRepo),
      tap(() => this.repoFacade.setDeleteOperation(httpCallStatus.LOADING)),
      mergeMap((action: any) =>
        this.repoService.delete(action.id).pipe(
          switchMap((data) => {
            this.repoFacade.setDeleteOperation(httpCallStatus.OK);
            return [repoActions.reloadRepoList()];
          }),
          catchError((error) => {
            console.error(error);
            this.repoFacade.setDeleteOperation(httpCallStatus.ERROR);
            return EMPTY;
          })
        )
      )
    )
  );
}
