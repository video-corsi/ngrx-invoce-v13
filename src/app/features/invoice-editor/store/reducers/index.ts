import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { Client, Invoice, InvoiceEditorUI, HttpStatus } from '../../../../model';
import { InvoicesState, reducer as invoicesReducer } from './invoices.reducer';
import { reducer as clientsReducer} from './clients.reducer';
import { reducer as uiReducer} from './ui.reducer';
import { reducer as httpStatusReducer} from './http-status.reducer';

export interface InvoiceEditorState {
  invoices: InvoicesState;
  ui: InvoiceEditorUI;
  clients: Client[];
  httpStatus: HttpStatus;
}

export const reducers: ActionReducerMap<InvoiceEditorState> = {
  invoices: invoicesReducer,
  clients: clientsReducer,
  ui: uiReducer,
  httpStatus: httpStatusReducer
};

export const selectInvoiceEditor = createFeatureSelector<InvoiceEditorState>('invoiceEditor');

