import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from './auth.reducer';

const authFeatureSelector = createFeatureSelector<AuthState>(authFeatureKey);

const userId = createSelector(authFeatureSelector, (state) => state.userId);

const username = createSelector(authFeatureSelector, (state) => state.username);

export const authSelectors = {
  userId,
  username,
};
