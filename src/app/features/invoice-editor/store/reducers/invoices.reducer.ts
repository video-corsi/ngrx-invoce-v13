import { Action, createReducer, on } from '@ngrx/store';
import { Invoice } from '../../../../model';
import * as InvoicesActions from '../actions/invoices.actions';
import * as InvoicesEditorActions from '../actions/invoices-editor.actions';

export interface InvoicesState {
  entities: Invoice[];
  activeInvoiceId: number | null;
}

export const initialState: InvoicesState = {
  entities: [],
  activeInvoiceId: null
};

export const reducer = createReducer(
  initialState,
  on(InvoicesEditorActions.initInvoiceEditorSuccess, (state, action) => ({...state, entities: action.invoices})),
  on(InvoicesActions.deleteInvoiceSuccess, (state, action) => ({ ...state, entities: state.entities.filter(m => m.id !== action.id)})),
  on(InvoicesActions.addInvoiceSuccess, (state, action) => ({ ...state, entities: [...state.entities, action.invoice]})),
  on(InvoicesActions.editInvoiceSuccess, (state, action) => ({
    ...state,
    entities: state.entities.map((invoice: Invoice) => invoice.id === action.invoice.id ? {...invoice, ...action.invoice} : invoice)
  })),

  on(InvoicesActions.createNewInvoice, (state) => ({ ...state, activeInvoiceId: null})),
  on(InvoicesActions.setActiveInvoice, (state, action) => ({ ...state, activeInvoiceId: action.id})),
  on(InvoicesActions.cleanActiveInvoice, (state) => ({ ...state, activeInvoiceId: null })),
);

/*export function reducer(state: InvoicesState | undefined, action?: Action) {
  return invoicesReducer(state, action);
}*/




/*
export const initialState: Invoice[] = [];

const invoicesReducer = createReducer(
  initialState,
  on(ActiveInvoiceActions.initInvoiceEditorSuccess, (state, action) => action.entities),
  on(InvoicesActions.deleteInvoiceSuccess, (state, action) => state.filter(m => m.id !== action.id)),
  on(InvoicesActions.addInvoiceSuccess, (state, action) => [...state, action.invoice]),
  on(InvoicesActions.editInvoiceSuccess, (state, action) => {
    return state.map((invoice: Invoice) => invoice.id === action.invoice.id ? {...invoice, ...action.invoice} : invoice);
  }),
);
export function reducer(state: Invoice[] | undefined, action?: Action) {
  return invoicesReducer(state, action);
}


*/
