import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../core';
import { Client, Invoice, InvoiceEditorUI } from '../../model';
import { getClients, getActiveInvoice, selectInvoices, getInvoiceHttpStatus, getUI } from './store/selectors';
import * as Actions from './store/actions';
import * as RouterActions from '../../core/router/store/router.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'fb-invoice-editor-final',
  template: `

    <fb-invoices-panel
        [show]="!(ui$ | async)?.isInvoicesPanelOpened"
        [invoices]="invoices$ | async"
        [activeInvoice]="invoice$ | async"
        (delete)="deleteInvoice($event)"
        (setActiveInvoice)="setActiveInvoice($event)"
        (closePanel)="closeInvoicesPanel()"
        (createNewInvoice)="createNewInvoice()"
    ></fb-invoices-panel>

    <div
        class="container-page"
        [ngClass]="{
          'container-page-with-left-panel-opened': !!(ui$ | async)?.isInvoicesPanelOpened,
          'container-page-with-right-panel-opened': !!(ui$ | async)?.isClientsPanelOpened
        }"
      >
      <fb-invoice-editor-error
          [error]="httpStatus$ | async"
      ></fb-invoice-editor-error>

      <fb-invoice-form
          [isInvoicesPanelOpened]="!(ui$ | async)?.isInvoicesPanelOpened"
          [isClientPanelOpened]="!(ui$ | async)?.isClientsPanelOpened"
          [activeInvoice]="invoice$ | async"
          [clients]="clients$ | async"
          (saveInvoice)="saveInvoice($event)"
          (openPanelClients)="openClientsPanel()"
          (openPanelInvoices)="openInvoicesPanel()"
          (printInvoice)="printInvoice()"
      ></fb-invoice-form>
    </div>

    <fb-clients-panel
        [show]="!!(ui$ | async)?.isClientsPanelOpened"
        [clients]="clients$ | async"
        (addClient)="addClient($event)"
        (editClient)="editClient($event)"
        (closePanel)="closeClientsPanel()"
    ></fb-clients-panel>
  `,
  styles: [`
      .container-page {
          max-width: 960px;
          width: 100%;
          /*margin-left: 100%;
          transform: translateX(0%);*/
          margin-left: 50%;
          transform: translateX(-50%);
          /*margin-left: 500px;*/
          padding: 0 20px;
          transition: all 0.5s ease-in-out;
      }

      .container-page-left-panel-opened {
   
      }

      @media only screen and (min-width: 960px) {
          .container-page-with-left-panel-opened {
              margin-left: 500px;
              transform: translateX(0);
          }

        .container-page-with-right-panel-opened {
          margin-left: 0px;
          transform: translateX(0);
        }
      }
  `]
})
export class InvoiceEditorComponent {
  invoice$ = this.store.pipe(select(getActiveInvoice));
  invoices$ = this.store.pipe(select(selectInvoices));
  clients$ = this.store.pipe(select(getClients));
  ui$ = this.store.pipe(select(getUI));
  httpStatus$ = this.store.pipe(select(getInvoiceHttpStatus));

  constructor(private store: Store<AppState>) {
    this.store.dispatch(Actions.initInvoiceEditor());
  }

  setActiveInvoice(invoice: Invoice) {
    this.store.dispatch(Actions.setActiveInvoice({id: invoice.id}));
  }

  createNewInvoice() {
    this.store.dispatch(Actions.createNewInvoice());
    this.closeInvoicesPanel();
  }


  deleteInvoice(invoice: Invoice) {
    this.store.dispatch(Actions.deleteInvoice({id: invoice.id}));
  }

  saveInvoice(formData: any) {
    this.store.dispatch(Actions.saveInvoice({invoice: formData}));
  }

  openInvoicesPanel() {
    this.store.dispatch(Actions.openInvoicesPanel());
  }

  closeInvoicesPanel() {
    this.store.dispatch(Actions.closeInvoicesPanel());
  }

  openClientsPanel() {
    this.store.dispatch(Actions.openClientPanel());
  }

  closeClientsPanel() {
    this.store.dispatch(Actions.closeClientPanel());
  }


  addClient(client: Client) {
    this.store.dispatch(Actions.addClient({client}));
  }

  editClient(client: Client) {
    this.store.dispatch(Actions.editClient({client}));
  }

  printInvoice() {
    this.store.dispatch(RouterActions.go({path: ['invoice-editor/print']}));
  }
}
