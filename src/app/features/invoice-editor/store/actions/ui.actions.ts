import { createAction } from '@ngrx/store';

export const openClientPanel = createAction('[ui] Open Client panel');
export const closeClientPanel = createAction('[ui] Close Client panel');
export const openInvoicesPanel = createAction('[ui] Open Invoices panel');
export const closeInvoicesPanel = createAction('[ui] Close Invoices panel');
