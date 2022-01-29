import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ClientsService } from '../services/clients.service';
import * as ClientsActions from '../actions/clients.actions';

@Injectable()
export class ClientsEffects {

  editClient$ = createEffect(() => this.actions$.pipe(
    ofType(ClientsActions.editClient),
    mergeMap(({client}) => this.clientsService.editClient(client)
      .pipe(
        map((result) => ClientsActions.editClientSuccess({client: result})),
        catchError(() => of((ClientsActions.editClientFailed())))
      ))
    )
  );

  addClient$ = createEffect(() => this.actions$.pipe(
    ofType(ClientsActions.addClient),
    mergeMap(({ client }) => this.clientsService.addClient(client)
      .pipe(
        map((result) => ClientsActions.addClientSuccess({client: result})),
        catchError(() => of((ClientsActions.addClientFailed())))
      )
    )
  ));

  /*
  deleteClient$ = createEffect(() => this.actions$.pipe(
    ofType(ClientsActions.deleteClient),
    mergeMap(({ client }) => this.clientsService.deleteClient(client)
      .pipe(
        map(result => ClientsActions.deleteClientSuccess({client})),
        catchError(() => of(ClientsActions.deleteClientFailed()))
      )
    )
  ));
  */

  constructor(
    private actions$: Actions,
    private clientsService: ClientsService,
  ) {}
}
