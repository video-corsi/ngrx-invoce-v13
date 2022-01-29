import { Action, createReducer, on } from '@ngrx/store';
import { InvoiceEditorUI } from '../../../../model';
import * as InvoiceEditorActions from '../actions';

export const initialState: InvoiceEditorUI = {
  isClientsPanelOpened: false,
  isInvoicesPanelOpened: true
};

export const reducer = createReducer(
  initialState,
  on(InvoiceEditorActions.openClientPanel, (state, action) => ({...state, isClientsPanelOpened: true, isInvoicesPanelOpened: false})),
  on(InvoiceEditorActions.closeClientPanel, (state, action) => ({...state, isClientsPanelOpened: false})),
  on(InvoiceEditorActions.openInvoicesPanel, (state, action) => ({...state, isInvoicesPanelOpened: true, isClientsPanelOpened: false})),
  on(InvoiceEditorActions.closeInvoicesPanel, (state, action) => ({...state, isInvoicesPanelOpened: false})),
);
/*

export function reducer(state: InvoiceEditorUI | undefined, action?: Action) {
  return uiReducer(state, action);
}
*/


