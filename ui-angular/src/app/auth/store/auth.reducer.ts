import { httpCallStatus } from './../../shared/constants/constants';
import { createReducer, on } from '@ngrx/store';
import { LOCAL_KEYS } from 'src/app/shared/constants/constants';
import { authActions } from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: any;
  loginStatus: string;
}

const initializeUser = () => {
  try {
    // JSON.parse for object
    return localStorage.getItem(LOCAL_KEYS.USER);
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  user: initializeUser(),
  loginStatus: null,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.setUser, (state, { user }) => ({ ...state, user })),
  on(authActions.setLoginStatus, (state, { status }) => ({
    ...state,
    loginStatus: status,
  }))
);
