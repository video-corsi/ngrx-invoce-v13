import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import * as RouterActions from './router.actions';

@Injectable()
export class RouterEffects {

  goEffect$ = createEffect(() => this.actions$.pipe(
    ofType(RouterActions.go),
    tap(action => {
      this.router.navigate(action.path, action.extras);
    })
    ), {dispatch: false}
  );

  backEffect$ = createEffect(() => this.actions$.pipe(
    ofType(RouterActions.back),
    tap(action => this.location.back()),
    ), {dispatch: false}
  );

  forwardEffect$ = createEffect(() => this.actions$.pipe(
    ofType(RouterActions.forward),
    tap(action => this.location.forward()),
    ), {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}
}
