import { httpCallStatus } from 'src/app/shared/constants/constants';
import { createAction, props } from '@ngrx/store';

const loadRepoList = createAction('[Repo] Load RepoList');

const loadRepoListOfProject = createAction('[Repo] Load RepoList of Project');

const reloadRepoList = createAction('[Repo] Reload RepoList');

const repoListLoaded = createAction(
  '[Repo] RepoList Loaded',
  props<{ repoList: any }>()
);

// const setLoadOperationStatus = createAction(
//   '[Repo] Load RepoList Status',
//   props<{ status: httpCallStatus }>()
// );

const loadRepo = createAction('[Repo] Load Repo', props<{ id: any }>());

const repoLoaded = createAction('[Repo] Repo Loaded', props<{ repo: any }>());

const createRepo = createAction('[Repo] Create Repo', props<{ repo: any }>());

const updateRepo = createAction(
  '[Repo] Update Repo',
  props<{ repo: any; id: string }>()
);

// const setSaveOperationStatus = createAction(
//   '[Repo] Save Repo Status',
//   props<{ status: httpCallStatus; id?: string }>()
// );

const deleteRepo = createAction('[Repo] Delete Repo', props<{ id: string }>());

// const setDeleteOperationStatus = createAction(
//   '[Repo] Delete Repo Status',
//   props<{ status: httpCallStatus }>()
// );

const resetDialogData = createAction('[Repo] Reset Dialog Data');

const repoActions = {
  loadRepoList,
  loadRepoListOfProject,
  reloadRepoList,
  repoListLoaded,
  // setLoadOperationStatus,
  loadRepo,
  repoLoaded,
  createRepo,
  updateRepo,
  // setSaveOperationStatus,
  resetDialogData,
  deleteRepo,
  // setDeleteOperationStatus,
};

export default repoActions;
