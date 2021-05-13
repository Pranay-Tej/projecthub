import { httpCallStatus } from 'src/app/shared/constants/constants';
import { createAction, props } from '@ngrx/store';

const loadProjectList = createAction('[Project] Load ProjectList');

const projectListLoaded = createAction(
  '[Project] ProjectList Loaded',
  props<{ projectList: any }>()
);

// const setLoadOperationStatus = createAction(
//   '[Project] Load ProjectList Status',
//   props<{ status: httpCallStatus }>()
// );

const setSelectedProjectId = createAction(
  '[Project] Set SelectedProjectId',
  props<{ id: any }>()
);

const loadProject = createAction(
  '[Project] Load Project',
  props<{ id: any }>()
);

const projectLoaded = createAction(
  '[Project] Project Loaded',
  props<{ project: any }>()
);

const createProject = createAction(
  '[Project] Create Project',
  props<{ project: any }>()
);

const updateProject = createAction(
  '[Project] Update Project',
  props<{ project: any; id: string }>()
);

// const setSaveOperationStatus = createAction(
//   '[Project] Save Project Status',
//   props<{ status: httpCallStatus }>()
// );

const deleteProject = createAction(
  '[Project] Delete Project',
  props<{ id: string }>()
);

// const setDeleteOperationStatus = createAction(
//   '[Project] Delete Project Status',
//   props<{ status: httpCallStatus }>()
// );

const resetDialogData = createAction('[Project] Reset Dialog Data');

const projectActions = {
  loadProjectList,
  projectListLoaded,
  // setLoadOperationStatus,
  setSelectedProjectId,
  loadProject,
  projectLoaded,
  createProject,
  updateProject,
  // setSaveOperationStatus,
  resetDialogData,
  deleteProject,
  // setDeleteOperationStatus,
};

export default projectActions;
