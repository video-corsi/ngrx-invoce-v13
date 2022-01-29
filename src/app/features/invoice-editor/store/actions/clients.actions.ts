import { createAction, props } from '@ngrx/store';
import { Client } from '../../../../model';

/**
 * New Client
 */
export const addClient = createAction(
  '[Client] Add ',
  props<{client: Client}>()
);

export const addClientSuccess = createAction(
  '[Client] Add success',
  props<{client: Client}>()
);

export const addClientFailed = createAction('[Client] Add failed');

/**
 * Edit Client
 */
export const editClient = createAction(
  '[Client] Edit ',
  props<{client: Client}>()
);

export const editClientSuccess = createAction(
  '[Client] Edit success',
  props<{client: Client}>()
);

export const editClientFailed = createAction('[Client] Edit failed');

/**
 * Delete Client
 */
/*
export const deleteClient = createAction(
  '[Client] Delete ',
  props<{client: Client}>()
);

export const deleteClientSuccess = createAction(
  '[Client] Delete success',
  props<{client: Client}>()
);

export const deleteClientFailed = createAction('[Client] Delete failed');
*/
