import { httpCallStatus } from 'src/app/shared/constants/constants';
import { createReducer, on } from '@ngrx/store';
import repoActions from './repo.actions';

export const repoFeatureKey = 'repo';
export interface RepoState {
  repoList: [];
  repo: any;
  // loadOperationStatus: httpCallStatus;
  // saveOperationStatus: {
  //   status: httpCallStatus;
  //   id?: string;
  // };
  // deleteOperationStatus: httpCallStatus;
}

export const initialState: RepoState = {
  repoList: [],
  repo: null,
  // loadOperationStatus: httpCallStatus.OK,
  // saveOperationStatus: null,
  // deleteOperationStatus: null,
};

export const repoReducer = createReducer(
  initialState,
  on(repoActions.repoListLoaded, (state, { repoList }) => ({
    ...state,
    repoList,
  })),
  // on(repoActions.setLoadOperationStatus, (state, { status }) => ({
  //   ...state,
  //   loadOperationStatus: status,
  // })),
  on(repoActions.repoLoaded, (state, { repo }) => ({
    ...state,
    repo,
  })),
  // on(repoActions.setSaveOperationStatus, (state, { status, id }) => ({
  //   ...state,
  //   saveOperationStatus: { status, id },
  // })),
  on(repoActions.resetDialogData, (state) => ({
    ...state,
    // saveOperationStatus: null,
    repo: null,
  }))
  // on(repoActions.setDeleteOperationStatus, (state, { status }) => ({
  //   ...state,
  //   deleteOperationStatus: status,
  // }))
);
