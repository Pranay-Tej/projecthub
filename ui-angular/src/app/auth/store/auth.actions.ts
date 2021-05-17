import { createAction, props } from '@ngrx/store';

const setUserId = createAction('[AUTH] Set User', props<{ userId: any }>());

const login = createAction(
  '[AUTH] Login',
  props<{ identity: string; password: string }>()
);

const setLoginStatus = createAction(
  '[AUTH] Set Login Status',
  props<{ status: string }>()
);

const loadUserInfo = createAction('[AUTH] Load User Info');

const logout = createAction('[AUTH] Logout');

export const authActions = {
  setUserId,
  login,
  setLoginStatus,
  loadUserInfo,
  logout,
};
