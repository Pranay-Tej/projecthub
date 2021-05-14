import { createReducer, on } from '@ngrx/store';
import repoActions from './repo.actions';

export const repoFeatureKey = 'repo';
export interface RepoState {
  repoList: [];
  repo: any;
}

export const initialState: RepoState = {
  repoList: [],
  repo: null,
};

export const repoReducer = createReducer(
  initialState,
  on(repoActions.repoListLoaded, (state, { repoList }) => ({
    ...state,
    repoList,
  })),
  on(repoActions.repoLoaded, (state, { repo }) => ({
    ...state,
    repo,
  })),
  on(repoActions.resetDialogData, (state) => ({
    ...state,
    repo: null,
  }))
);
