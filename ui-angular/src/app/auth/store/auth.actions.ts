import { createAction, props } from '@ngrx/store';

const setUser = createAction('[AUTH] Set User', props<{ user: any }>());

const login = createAction(
  '[AUTH] Login',
  props<{ email: string; password: string }>()
);

const setLoginStatus = createAction(
  '[AUTH] Set Login Status',
  props<{ status: string }>()
);

const loadUserInfo = createAction('[AUTH] Load User Info');

const logout = createAction('[AUTH] Logout');

export const authActions = {
  setUser,
  login,
  setLoginStatus,
  loadUserInfo,
  logout,
};
