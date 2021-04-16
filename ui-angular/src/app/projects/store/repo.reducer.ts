import { Action, createReducer, on } from '@ngrx/store';

export const repoFeatureKey = 'repo';

export interface State {}

export const initialState: State = {};

export const repoReducer = createReducer(initialState);
