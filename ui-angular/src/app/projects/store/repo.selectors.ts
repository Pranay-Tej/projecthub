import { createFeatureSelector, createSelector } from '@ngrx/store';
import { repoFeatureKey, RepoState } from './repo.reducer';

const repoFeatureSelector = createFeatureSelector<RepoState>(repoFeatureKey);

const repoList = createSelector(repoFeatureSelector, (state) => state.repoList);

const repo = createSelector(repoFeatureSelector, (state) => state.repo);

const repoSelectors = {
  repoList,
  repo,
};

export default repoSelectors;
