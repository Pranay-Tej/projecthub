import { authReducer, AuthState } from './../auth/store/auth.reducer';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
