import { createAction, props } from '@ngrx/store';

const loadProjectList = createAction('[Project] Load ProjectList');

const projectListLoaded = createAction(
  '[Project] ProjectList Loaded',
  props<{ projectList: any }>()
);

const setSelectedProjectId = createAction(
  '[Project] Set SelectedProjectId',
  props<{ id: any }>()
);

const setSelectedProjectName = createAction(
  '[Project] Set SelectedProjectName',
  props<{ name: any }>()
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

const deleteProject = createAction(
  '[Project] Delete Project',
  props<{ id: string }>()
);

const resetDialogData = createAction('[Project] Reset Dialog Data');

const projectActions = {
  loadProjectList,
  projectListLoaded,
  setSelectedProjectId,
  setSelectedProjectName,
  loadProject,
  projectLoaded,
  createProject,
  updateProject,
  resetDialogData,
  deleteProject,
};

export default projectActions;
