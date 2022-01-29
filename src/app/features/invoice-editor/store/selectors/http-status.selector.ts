import { createSelector } from '@ngrx/store';
import { InvoiceEditorState, selectInvoiceEditor } from '../reducers';

export const getInvoiceHttpStatus = createSelector(
  selectInvoiceEditor,
  (state: InvoiceEditorState) => state.httpStatus
);

