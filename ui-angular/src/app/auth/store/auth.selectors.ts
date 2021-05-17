import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from './auth.reducer';

const authFeatureSelector = createFeatureSelector<AuthState>(authFeatureKey);

const userId = createSelector(authFeatureSelector, (state) => state.userId);

const loginStatus = createSelector(
  authFeatureSelector,
  (state) => state.loginStatus
);

export const authSelectors = {
  userId,
  loginStatus,
};
