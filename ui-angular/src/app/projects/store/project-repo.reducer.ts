import { createReducer, on } from '@ngrx/store';
import projectRepoActions from './project-repo.actions';

export const projectRepoFeatureKey = 'projectRepo';

export interface ProjectRepoState {
  projectListOfRepo: [];
}

export const initialState: ProjectRepoState = {
  projectListOfRepo: [],
};

export const projectRepoReducer = createReducer(
  initialState,
  on(
    projectRepoActions.projectListOfRepoLoaded,
    (state, { projectListOfRepo }) => ({
      ...state,
      projectListOfRepo,
    })
  )
);
