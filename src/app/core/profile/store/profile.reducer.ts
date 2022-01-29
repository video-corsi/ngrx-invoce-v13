import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../../model';
import * as ProfileActions from './profile.actions';

export interface ProfileState {
  user: User;
  error: boolean;
}

export const initialState: ProfileState = {
  user: {},
  error: false
};

const profileReducer = createReducer(
  initialState,
  on(ProfileActions.loadProfileSuccess, (state, action) => ({user: {...action.user}, error: false})),
  on(ProfileActions.loadProfileFailed, (state, action) => ({...state, error: true})),
  // on(ProfileActions.editProfileSuccess, (state, action) => ({user: {...action.user}, error: false})),
  on(ProfileActions.editProfileSuccess, (state, action) => ({user: {...action.user}, error: false})),
  on(ProfileActions.editProfileFailed, (state, action) => ({...state, error: true})),
);

export function reducer(state: ProfileState | undefined, action: Action) {
  return profileReducer(state, action);
}
