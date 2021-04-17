import { createReducer, on } from '@ngrx/store';
import { httpCallStatus } from './../../shared/constants/constants';
import projectActions from './project.actions';

export const projectFeatureKey = 'project';

export interface ProjectState {
  projectList: [];
  selectedProjectId: string;
  project: any;
  loadOperationStatus: httpCallStatus;
  saveOperationStatus: httpCallStatus;
  deleteOperationStatus: httpCallStatus;
}

export const initialState: ProjectState = {
  projectList: [],
  selectedProjectId: null,
  project: null,
  loadOperationStatus: httpCallStatus.OK,
  saveOperationStatus: null,
  deleteOperationStatus: null,
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
  on(projectActions.setLoadOperationStatus, (state, { status }) => ({
    ...state,
    loadOperationStatus: status,
  })),
  on(projectActions.projectLoaded, (state, { project }) => ({
    ...state,
    project,
  })),
  on(projectActions.setSaveOperationStatus, (state, { status }) => ({
    ...state,
    saveOperationStatus: status,
  })),
  on(projectActions.resetDialogData, (state) => ({
    ...state,
    saveOperationStatus: null,
    project: null,
  })),
  on(projectActions.setDeleteOperationStatus, (state, { status }) => ({
    ...state,
    deleteOperationStatus: status,
  }))
);
