import { createAction, props } from '@ngrx/store';
import { Invoice } from '../../../../model';

/**
 * Create New Invoice
 */
export const saveInvoice = createAction(
  '[Invoices] Save',
  props<{ invoice: Partial<Invoice>}>()
);

/**
 * Add Invoice
 */
export const addInvoice = createAction(
  '[Invoices] Add ',
  props<{invoice: Invoice}>()
);

export const addInvoiceSuccess = createAction(
  '[Invoices] Add success',
  props<{invoice: Invoice}>()
);

export const addInvoiceFailed = createAction('[Invoices] Add failed');

/**
 * Edit Invoice
 */
export const editInvoice = createAction(
  '[Invoices] Edit ',
  props<{invoice: Partial<Invoice>}>()
);

export const editInvoiceSuccess = createAction(
  '[Invoices] Edit success',
  props<{invoice: Partial<Invoice>}>()
);

export const editInvoiceFailed = createAction('[Invoices] Edit failed');

/**
 * Delete Invoice
 */
export const deleteInvoice = createAction(
  '[Invoices] Delete',
  props<{id: number}>()
);

export const deleteInvoiceSuccess = createAction(
  '[Invoices] Delete success',
  props<{id: number}>()
);

export const deleteInvoiceFailed = createAction('[Invoices] Delete failed');





/**
 * Create New Invoice
 */
export const createNewInvoice = createAction(
  '[Invoice] Create New'
);

export const createNewInvoiceSuccess = createAction(
  '[Invoice] Create New success',
  props<{ nextInvoiceNumber: number }>()
);


/**
 * set or reset Active Invoice
 */
export const setActiveInvoice = createAction(
  '[Invoice] set active invoice',
  props<{ id: number }>()
);

export const setActiveInvoiceSuccess = createAction(
  '[Invoice] set active invoice success',
  props<{ id: number }>()
);


export const cleanActiveInvoice = createAction(
  '[Invoice] clean active invoice ',
);


