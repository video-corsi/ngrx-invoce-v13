import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { catchError, mergeMap, switchMap, switchMapTo, take, tap, withLatestFrom } from 'rxjs/operators';
import { Client, Invoice } from '../../../../model';
import { AppState } from '../../../../core';
import { InvoicesService } from '../services/invoices.service';
import { ProfileService } from '../../../../core/profile/services/profile.service';
import { ClientsService } from '../services/clients.service';
import { getActiveInvoice, getNextInvoiceNumber } from '../selectors';
import * as InvoicesActions from '../actions/invoices.actions';
import * as UiActions from '../actions/ui.actions';


@Injectable()
export class InvoicesEffects {

  saveInvoice$ = createEffect(() => this.actions$.pipe(
    ofType(InvoicesActions.saveInvoice),
    withLatestFrom(
      //this.store.pipe(select(getActiveInvoice)),
      this.store.select(getActiveInvoice)
    ),
    mergeMap((
      [action, currentInvoice]: [{ invoice: Partial<Invoice> }, Invoice | undefined]
    ) => {
      if (currentInvoice && currentInvoice.id) {
        return of(InvoicesActions.editInvoice({invoice: {...action.invoice, id: currentInvoice.id}}));
      }
      return of(InvoicesActions.addInvoice({invoice: {...currentInvoice, ...action.invoice} as Invoice}));
    }))
  );

  addInvoice$ = createEffect(() => this.actions$.pipe(
    ofType(InvoicesActions.addInvoice),
    withLatestFrom(
      this.store.pipe(select(getNextInvoiceNumber))
    ),
    mergeMap(([action, nextInvoicenNumber]) =>
      this.invoicesService.addInvoice({...action.invoice, invoiceNumber: nextInvoicenNumber})
      .pipe(
        switchMap((result: Invoice) => [
          // Dispatch multiple actions
          InvoicesActions.addInvoiceSuccess({invoice: result}),
          InvoicesActions.setActiveInvoice({id: result.id}),
          UiActions.openInvoicesPanel()
        ]),
        catchError(() => of(InvoicesActions.addInvoiceFailed()))
      ))
    )
  );

  editInvoice$ = createEffect(() => this.actions$.pipe(
    ofType(InvoicesActions.editInvoice),
    mergeMap(({invoice}) => this.invoicesService.editInvoice(invoice)
      .pipe(
        switchMap((result: Partial<Invoice>) => [
          InvoicesActions.editInvoiceSuccess({invoice: result}),
          UiActions.openInvoicesPanel(),
        ]),
        catchError(() => of(InvoicesActions.editInvoiceFailed()))
      ))
    )
  );

  deleteInvoice$ = createEffect(() => this.actions$.pipe(
    ofType(InvoicesActions.deleteInvoice),
    withLatestFrom(this.store.pipe(select(getActiveInvoice))),
    mergeMap(([action, active]: [{ id: number }, Invoice | undefined]) => {
      return this.invoicesService.deleteInvoice(action.id)
      .pipe(
        switchMapTo(
          active && active.id === action.id
            ? [InvoicesActions.deleteInvoiceSuccess({id: action.id}), InvoicesActions.cleanActiveInvoice()]
            : of(InvoicesActions.deleteInvoiceSuccess({id: action.id}))
        ),
        catchError(() => of(InvoicesActions.deleteInvoiceFailed()))
      );
    })
    )
  );


  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private profileService: ProfileService,
    private clientsService: ClientsService,
    private invoicesService: InvoicesService
  ) {}
}
