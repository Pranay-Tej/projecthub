import { createReducer, on } from '@ngrx/store';
import projectActions from './project.actions';

export const projectFeatureKey = 'project';

export interface ProjectState {
  projectList: [];
  selectedProjectId: string;
  project: any;
}

export const initialState: ProjectState = {
  projectList: [],
  selectedProjectId: null,
  project: null,
};

export const projectReducer = createReducer(
  initialState,
  on(projectActions.projectListLoaded, (state, { projectList }) => ({
    ...state,
    projectList,
  })),
  on(projectActions.setSelectedProjectId, (state, { id }) => ({
    ...state,
    selectedProjectId: id,
  })),
  on(projectActions.projectLoaded, (state, { project }) => ({
    ...state,
    project,
  })),
  on(projectActions.resetDialogData, (state) => ({
    ...state,
    project: null,
  }))
);
