import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  accessToken?: string | null;
  error?: boolean;
}

export const initialState: AuthState = {};

const authReducer = createReducer(
  initialState,
  on(AuthActions.saveAuth, (state, action) => ({accessToken: action.auth.accessToken, error: false})),
  on(AuthActions.loginSuccess, (state, action) => ({accessToken: action.auth.accessToken, error: false})),
  on(AuthActions.loginFailed, state => ({...state, error: true})),
  on(AuthActions.logoutSuccess, () => ({accessToken: null, error: false})),
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
