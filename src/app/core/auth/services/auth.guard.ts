import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { AppState } from '../../core.module';
import { getToken } from '../store/auth.selectors';
import * as RouterActions from '../../router/store/router.actions';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>) {}

  canActivate() {
    return this.store.pipe(
      select(getToken),
      map(token => !!token),
      tap(isLogged => {
        if (!isLogged) {
          this.store.dispatch(RouterActions.go({ path: ['login'] }));
        }
      })
    );
  }

}
