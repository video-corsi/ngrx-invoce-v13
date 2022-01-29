import { Client } from './client';
import { User } from './user';

/**
 * Invoice stored on db
 */
export interface Invoice {
  id: number;
  invoiceNumber: number;
  subject: string;
  date: number;
  clientID: number;
  items: InvoiceItem[];
  total: number;
  //client?: Client;
}

export interface InvoiceItem {
  text: string;
  price: number;
}

/**
 * Invoice Editor
 */
export interface InvoiceEditorUI {
  isClientsPanelOpened: boolean;
  isInvoicesPanelOpened: boolean;
}
