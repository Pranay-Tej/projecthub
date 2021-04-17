import { createAction, props } from '@ngrx/store';

const loadProjectListOfRepo = createAction(
  '[ProjectRepo] Load ProjectListOfRepo',
  props<{ repoId: string }>()
);

const projectListOfRepoLoaded = createAction(
  '[ProjectRepo] ProjectListOfRepo Loaded',
  props<{ projectListOfRepo: any }>()
);

const add = createAction(
  '[ProjectRepo] Add ProjectRepo',
  props<{ projectId: string; repoId: string }>()
);

const remove = createAction(
  '[ProjectRepo] Remove ProjectRepo',
  props<{ projectId: string; repoId: string }>()
);

const projectRepoActions = {
  loadProjectListOfRepo,
  projectListOfRepoLoaded,
  add,
  remove,
};

export default projectRepoActions;
