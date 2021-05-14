import { createAction, props } from '@ngrx/store';

const loadRepoList = createAction('[Repo] Load RepoList');

const loadRepoListOfProject = createAction('[Repo] Load RepoList of Project');

const reloadRepoList = createAction('[Repo] Reload RepoList');

const repoListLoaded = createAction(
  '[Repo] RepoList Loaded',
  props<{ repoList: any }>()
);

const loadRepo = createAction('[Repo] Load Repo', props<{ id: any }>());

const repoLoaded = createAction('[Repo] Repo Loaded', props<{ repo: any }>());

const createRepo = createAction('[Repo] Create Repo', props<{ repo: any }>());

const updateRepo = createAction(
  '[Repo] Update Repo',
  props<{ repo: any; id: string }>()
);

const deleteRepo = createAction('[Repo] Delete Repo', props<{ id: string }>());

const resetDialogData = createAction('[Repo] Reset Dialog Data');

const repoActions = {
  loadRepoList,
  loadRepoListOfProject,
  reloadRepoList,
  repoListLoaded,
  loadRepo,
  repoLoaded,
  createRepo,
  updateRepo,
  resetDialogData,
  deleteRepo,
};

export default repoActions;
