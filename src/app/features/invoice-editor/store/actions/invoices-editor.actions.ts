import { createAction, props } from '@ngrx/store';
import { Client, Invoice } from '../../../../model';

/**
 * Init Invoice Editor
 */
export const initInvoiceEditor = createAction(
  '[Invoice Editor] Init'
);

export const initInvoiceEditorFailed = createAction('[Invoice Editor] Init failed');

export const initInvoiceEditorSuccess = createAction(
  '[Invoice Editor] Init success',
  props<{ invoices: Invoice[], clients: Client[] /*, invoice: Invoice*/ }>()
);
