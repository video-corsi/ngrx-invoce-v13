import { createAction, props } from '@ngrx/store';
import { User } from '../../../model';

/**
 * Create New User
 */
/*export const saveProfile = createAction(
  '[Profile] Save',
  props<{ user: Partial<User>}>()
);*/

/**
 * Load User
 */
export const loadProfile = createAction(
  '[Profile] load ',
);

export const loadProfileSuccess = createAction(
  '[Profile] load success',
  props<{user: User}>()
);

export const loadProfileFailed = createAction('[Profile] Edit failed');

/**
 * Edit User
 */
export const editProfile = createAction(
  '[Profile] Edit ',
  props<{user: User}>()
);

export const editProfileSuccess = createAction(
  '[Profile] Edit success',
  props<{user: User}>()
);

export const editProfileFailed = createAction('[Profile] Edit failed');



