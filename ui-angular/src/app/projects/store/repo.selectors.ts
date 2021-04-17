import { createFeatureSelector, createSelector } from '@ngrx/store';
import { repoFeatureKey, RepoState } from './repo.reducer';

const repoFeatureSelector = createFeatureSelector<RepoState>(repoFeatureKey);

const repoList = createSelector(repoFeatureSelector, (state) => state.repoList);

const loadOperationStatus = createSelector(
  repoFeatureSelector,
  (state) => state.loadOperationStatus
);

const repo = createSelector(repoFeatureSelector, (state) => state.repo);

const saveOperationStatus = createSelector(
  repoFeatureSelector,
  (state) => state.saveOperationStatus
);

const deleteOperationStatus = createSelector(
  repoFeatureSelector,
  (state) => state.deleteOperationStatus
);

const repoSelectors = {
  repoList,
  loadOperationStatus,
  repo,
  saveOperationStatus,
  deleteOperationStatus,
};

export default repoSelectors;
