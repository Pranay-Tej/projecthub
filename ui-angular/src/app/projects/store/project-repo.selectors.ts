import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  projectRepoFeatureKey,
  ProjectRepoState,
} from './project-repo.reducer';

const projectRepoFeatureSelector = createFeatureSelector<ProjectRepoState>(
  projectRepoFeatureKey
);

const projectListOfRepo = createSelector(
  projectRepoFeatureSelector,
  (state) => state.projectListOfRepo
);

const projectRepoSelectors = {
  projectListOfRepo,
};

export default projectRepoSelectors;
