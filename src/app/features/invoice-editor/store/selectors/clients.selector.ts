import { createSelector } from '@ngrx/store';
import { InvoiceEditorState, selectInvoiceEditor } from '../reducers';
import { Client, Invoice } from '../../../../model';
import { getActiveInvoice } from './invoices.selector';

export const getClients = createSelector(
  selectInvoiceEditor,
  (state: InvoiceEditorState) => state.clients
);

export const getClientById = createSelector(
  getClients,
  getActiveInvoice,
  (clients: Client[], invoice: Invoice | undefined) =>
    clients.find(c => +c.id === invoice?.clientID)
);
