import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from './auth.reducer';

const authFeatureSelector = createFeatureSelector<AuthState>(authFeatureKey);

const user = createSelector(authFeatureSelector, (state) => state.user);

const loginStatus = createSelector(
  authFeatureSelector,
  (state) => state.loginStatus
);

export const authSelectors = {
  user,
  loginStatus,
};
