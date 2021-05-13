import { createFeatureSelector, createSelector } from '@ngrx/store';
import { projectFeatureKey, ProjectState } from './project.reducer';

const projectFeatureSelector =
  createFeatureSelector<ProjectState>(projectFeatureKey);

const projectList = createSelector(
  projectFeatureSelector,
  (state) => state.projectList
);

// const loadOperationStatus = createSelector(
//   projectFeatureSelector,
//   (state) => state.loadOperationStatus
// );

const selectedProjectId = createSelector(
  projectFeatureSelector,
  (state) => state.selectedProjectId
);
const project = createSelector(
  projectFeatureSelector,
  (state) => state.project
);

// const saveOperationStatus = createSelector(
//   projectFeatureSelector,
//   (state) => state.saveOperationStatus
// );

// const deleteOperationStatus = createSelector(
//   projectFeatureSelector,
//   (state) => state.deleteOperationStatus
// );

const projectSelectors = {
  projectList,
  // loadOperationStatus,
  selectedProjectId,
  project,
  // saveOperationStatus,
  // deleteOperationStatus,
};

export default projectSelectors;
