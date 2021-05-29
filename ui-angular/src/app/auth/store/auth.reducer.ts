import { httpCallStatus } from './../../shared/constants/constants';
import { createReducer, on } from '@ngrx/store';
import { LOCAL_KEYS } from 'src/app/shared/constants/constants';
import { authActions } from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  username: string;
  userId: any;
}

// const initializeUser = () => {
//   try {
//     // JSON.parse for object
//     return localStorage.getItem(LOCAL_KEYS.USER_ID);
//   } catch {
//     return null;
//   }
// };

const initialState: AuthState = {
  username: localStorage.getItem(LOCAL_KEYS.USERNAME),
  userId: localStorage.getItem(LOCAL_KEYS.USER_ID),
};

export const authReducer = createReducer(
  initialState,
  on(authActions.setUserId, (state, { userId }) => ({ ...state, userId })),
  on(authActions.setUsername, (state, { username }) => ({ ...state, username }))
);
