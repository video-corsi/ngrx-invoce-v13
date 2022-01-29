import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { Client, Invoice } from '../../../../model';
import { AppState } from '../../../../core';
import { InvoicesService } from '../services/invoices.service';
import { ClientsService } from '../services/clients.service';
import { getActiveInvoice } from '../selectors';
import * as InvoicesEditorActions from '../actions/invoices-editor.actions';
import * as InvoicesActions from '../actions/invoices.actions';


@Injectable()
export class InvoicesEditorEffects {

  initEditor$ = createEffect(() => this.actions$.pipe(
    ofType(InvoicesEditorActions.initInvoiceEditor),
    switchMap(() => forkJoin([
      // load invoices
      this.invoicesService.loadInvoices(),
      // load clients
      this.clientsService.loadClients(),
      // get latest invoice
      this.store.pipe(take(1), select(getActiveInvoice)),
    ])
      .pipe(
        switchMap((result: [Invoice[], Client[], Invoice | undefined]) => {
          return [
            InvoicesEditorActions.initInvoiceEditorSuccess({
              invoices: result[0],
              clients: result[1]
            }),
            // If editor is open first time, create a new invoice
            // otherwise load a previous one
            result[2] ? InvoicesActions.setActiveInvoice({id: result[2].id}) : InvoicesActions.createNewInvoice()
          ];
        }),
        catchError(() => of(InvoicesEditorActions.initInvoiceEditorFailed()))
      ))
    )
  );

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private clientsService: ClientsService,
    private invoicesService: InvoicesService
  ) {}
}
