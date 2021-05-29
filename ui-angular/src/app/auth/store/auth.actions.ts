import { createAction, props } from '@ngrx/store';

const setUserId = createAction('[AUTH] Set User', props<{ userId: any }>());

const setUsername = createAction(
  '[AUTH] Set Username',
  props<{ username: string }>()
);

const login = createAction(
  '[AUTH] Login',
  props<{ identity: string; password: string }>()
);

const register = createAction(
  '[AUTH] Register',
  props<{ username: string; password: string; email?: string }>()
);

const loadUserInfo = createAction('[AUTH] Load User Info');

const logout = createAction('[AUTH] Logout');

export const authActions = {
  setUsername,
  setUserId,
  register,
  login,
  loadUserInfo,
  logout,
};
