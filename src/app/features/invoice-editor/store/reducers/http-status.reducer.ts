import { Action, createReducer, on } from '@ngrx/store';
import { HttpStatus, StatusType } from '../../../../model';
import * as InvoicesActions from '../actions/invoices.actions';
import * as ClientsActions from '../actions/clients.actions';
import * as InvoicesEditorActions from '../actions/invoices-editor.actions';

export const initialState: HttpStatus = { type: null, reason: null };

export const reducer = createReducer(
  initialState,
  on(InvoicesEditorActions.initInvoiceEditorFailed, () => ({ type: 'error' as StatusType, reason: 'initInvoiceEditorFailed'})),
  on(InvoicesActions.editInvoiceFailed, () => ({ type: 'error' as StatusType, reason: 'editInvoiceFailed'})),
  on(InvoicesActions.addInvoiceFailed, () => ({ type: 'error' as StatusType, reason: 'addInvoiceFailed'})),
  on(InvoicesActions.deleteInvoiceFailed, () => ({ type: 'error' as StatusType, reason: 'deleteInvoiceFailed'})),

  on(ClientsActions.addClientFailed, (action) => ({ type: 'error' as StatusType, reason: 'addClientFailed'})),
  on(ClientsActions.editClientFailed, () => ({ type: 'error' as StatusType, reason: 'editClientFailed'})),


  on(InvoicesEditorActions.initInvoiceEditorSuccess, () => ({ type: 'success' as StatusType, reason: 'initInvoiceEditorSuccess'})),
  on(InvoicesActions.editInvoiceSuccess, () => ({ type: 'success' as StatusType, reason: 'editInvoiceSuccess'})),
  on(InvoicesActions.addInvoiceSuccess, () => ({ type: 'success' as StatusType, reason: 'addInvoiceSuccess'})),
  on(InvoicesActions.deleteInvoiceSuccess, () => ({ type: 'success' as StatusType, reason: 'deleteInvoiceSuccess'})),
  on(ClientsActions.addClientSuccess, () => ({ type: 'success' as StatusType, reason: 'addClientSuccess'})),
  on(ClientsActions.editClientSuccess, () => ({ type: 'success' as StatusType, reason: 'editClientSuccess'})),

);



