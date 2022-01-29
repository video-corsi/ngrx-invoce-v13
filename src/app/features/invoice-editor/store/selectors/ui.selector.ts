import { createSelector } from '@ngrx/store';
import { InvoiceEditorState, selectInvoiceEditor } from '../reducers';

export const getUI = createSelector(
  selectInvoiceEditor,
  (state: InvoiceEditorState) => state.ui
);

export const selectClientPanelOpened = createSelector(
  selectInvoiceEditor,
  (state: InvoiceEditorState) => state.ui.isClientsPanelOpened
);

export const selectInvoicePanelOpened = createSelector(
  selectInvoiceEditor,
  (state: InvoiceEditorState) => state.ui.isInvoicesPanelOpened
);
