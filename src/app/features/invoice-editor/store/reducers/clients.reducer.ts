import { Action, createReducer, on } from '@ngrx/store';
import { Client } from '../../../../model';
import * as ClientsActions from '../actions/clients.actions';
import * as InvoicesActions from '../actions/invoices.actions';
import * as InvoicesEditorActions from '../actions/invoices-editor.actions';

export const initialState: Client[] = [];

export const reducer = createReducer(
  initialState,
  on(InvoicesEditorActions.initInvoiceEditorSuccess, (state, action) => action.clients),
  /*on(ClientsActions.deleteClientSuccess, (state, action) => state.filter(m => m.id !== action.client.id)),*/
  on(ClientsActions.addClientSuccess, (state, action) => [...state, action.client]),
  on(ClientsActions.editClientSuccess, (state, action) => {
    return state.map((client: Client) => client.id === action.client.id ? {...client, ...action.client} : client);
  })
);
