import { createFeatureSelector, createSelector } from '@ngrx/store';
import { projectFeatureKey, ProjectState } from './project.reducer';

const projectFeatureSelector =
  createFeatureSelector<ProjectState>(projectFeatureKey);

const projectList = createSelector(
  projectFeatureSelector,
  (state) => state.projectList
);

const selectedProjectId = createSelector(
  projectFeatureSelector,
  (state) => state.selectedProjectId
);

const selectedProjectName = createSelector(
  projectFeatureSelector,
  (state) => state.selectedProjectName
);

const project = createSelector(
  projectFeatureSelector,
  (state) => state.project
);

const projectSelectors = {
  projectList,
  selectedProjectId,
  selectedProjectName,
  project,
};

export default projectSelectors;
