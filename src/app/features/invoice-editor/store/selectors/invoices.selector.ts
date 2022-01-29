import { createSelector } from '@ngrx/store';
import { InvoiceEditorState, selectInvoiceEditor } from '../reducers';

/**
 * Get all entities
 */
export const selectInvoices = createSelector(
  selectInvoiceEditor,
  (state: InvoiceEditorState) => state.invoices.entities
);

/**
 * Get the next invoice number
 * HOW? get the highest invoice number from entities and add 1.
 */
export const getNextInvoiceNumber = createSelector(
  selectInvoiceEditor,
  (state: InvoiceEditorState) => state.invoices.entities
    .reduce(
      (max, curr) => {
        return  (+curr.invoiceNumber > max ? +curr.invoiceNumber : max)
      },
    0
  ) + 1
);


/**
 * Get Active Invoice
 */
export const getActiveInvoice = createSelector(
  selectInvoiceEditor,
  (state: InvoiceEditorState) => state.invoices.entities.find(i => i.id === state.invoices.activeInvoiceId)
);
