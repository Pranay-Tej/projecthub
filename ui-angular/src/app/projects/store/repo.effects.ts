import { ProjectRepoService } from './../services/project-repo.service';
import { RepoService } from './../services/repo.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { httpCallStatus } from 'src/app/shared/constants/constants';
import repoActions from './repo.actions';
import projectSelectors from './project.selectors';

@Injectable()
export class RepoEffects {
  constructor(
    private actions$: Actions,
    private projectRepoService: ProjectRepoService,
    private repoService: RepoService,
    private store: Store
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
      tap(() =>
        this.store.dispatch(
          repoActions.setLoadOperationStatus({
            status: httpCallStatus.LOADING,
          })
        )
      ),
      mergeMap(() =>
        this.repoService.getAllRepos().pipe(
          switchMap((data) => [
            repoActions.repoListLoaded({ repoList: data }),
            repoActions.setLoadOperationStatus({
              status: httpCallStatus.OK,
            }),
          ]),
          catchError((error) => {
            console.error(error);
            return [
              repoActions.setLoadOperationStatus({
                status: httpCallStatus.ERROR,
              }),
            ];
          })
        )
      )
    )
  );

  loadRepoListOfProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(repoActions.loadRepoListOfProject),
      tap(() =>
        this.store.dispatch(
          repoActions.setLoadOperationStatus({
            status: httpCallStatus.LOADING,
          })
        )
      ),
      withLatestFrom(this.store.select(projectSelectors.selectedProjectId)),
      mergeMap(([action, selectedProjectId]) =>
        this.projectRepoService.getRepoListOfProject(selectedProjectId).pipe(
          map((data: any) => data.map((projectRepo) => projectRepo.repoId)),
          switchMap((data: any) => {
            // console.log(data);
            return [
              repoActions.repoListLoaded({ repoList: data }),
              repoActions.setLoadOperationStatus({
                status: httpCallStatus.OK,
              }),
            ];
          }),
          catchError((error) => {
            console.error(error);
            return [
              repoActions.setLoadOperationStatus({
                status: httpCallStatus.ERROR,
              }),
            ];
          })
        )
      )
    )
  );

  createRepo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(repoActions.createRepo),
      tap(() =>
        this.store.dispatch(
          repoActions.setSaveOperationStatus({
            status: httpCallStatus.LOADING,
          })
        )
      ),
      mergeMap((action: any) =>
        this.repoService.create(action.repo).pipe(
          switchMap((data: any) => [
            repoActions.setSaveOperationStatus({
              status: httpCallStatus.OK,
              id: data._id,
            }),
            repoActions.reloadRepoList(),
          ]),
          catchError((error) => {
            console.error(error);
            return [
              repoActions.setSaveOperationStatus({
                status: httpCallStatus.ERROR,
              }),
            ];
          })
        )
      )
    )
  );

  updateRepo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(repoActions.updateRepo),
      tap(() =>
        this.store.dispatch(
          repoActions.setSaveOperationStatus({
            status: httpCallStatus.LOADING,
          })
        )
      ),
      mergeMap((action: any) =>
        this.repoService.update(action.repo, action.id).pipe(
          switchMap((data: any) => [
            repoActions.setSaveOperationStatus({
              status: httpCallStatus.OK,
            }),
            repoActions.reloadRepoList(),
          ]),
          catchError((error) => {
            console.error(error);
            return [
              repoActions.setSaveOperationStatus({
                status: httpCallStatus.ERROR,
              }),
            ];
          })
        )
      )
    )
  );

  loadRepo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(repoActions.loadRepo),
      mergeMap((action: any) =>
        this.repoService.getRepo(action.id).pipe(
          switchMap((data: any) => [repoActions.repoLoaded({ repo: data })]),
          catchError((error) => {
            console.error(error);
            return of(error);
          })
        )
      )
    )
  );

  deleteRepo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(repoActions.deleteRepo),
      tap(() =>
        this.store.dispatch(
          repoActions.setDeleteOperationStatus({
            status: httpCallStatus.LOADING,
          })
        )
      ),
      mergeMap((action: any) =>
        this.repoService.delete(action.id).pipe(
          switchMap((data) => [
            repoActions.setDeleteOperationStatus({
              status: httpCallStatus.OK,
            }),
            repoActions.reloadRepoList(),
          ]),
          catchError((error) => {
            console.error(error);
            return [
              repoActions.setDeleteOperationStatus({
                status: httpCallStatus.ERROR,
              }),
            ];
          })
        )
      )
    )
  );
}
