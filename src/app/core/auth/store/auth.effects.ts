import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { of, catchError, exhaustMap, filter, map, mapTo, switchMap, switchMapTo, tap } from 'rxjs';
import { Auth } from '../../../model';
import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.actions';
import * as ProfileActions from '../../profile/store/profile.actions';
import * as RouterActions from '../../router/store/router.actions';

@Injectable()
export class AuthEffects {

  initEffect$ = createEffect(() => this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    // get token
    mapTo(this.authService.getToken()),
    // we want dispatch an action only when an accessToken is found in localStorage
    filter(accessToken => !!accessToken),
    // save token in localStorage
    // map(accessToken => AuthActions.saveAuth({ auth: { accessToken }}))
    switchMap((accessToken) => [
      AuthActions.saveAuth({ auth: { accessToken }}),
      ProfileActions.loadProfile(),
    ])
  ));


  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(action =>
        this.authService.login(action.email, action.password).pipe(
          // tap((auth) => this.srv.saveToken(auth.accessToken)),
          map((auth: Auth) => AuthActions.loginSuccess({auth})),
          catchError(() => of(AuthActions.loginFailed())),
        )
      )
    )
  );

  loginSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(action => this.authService.saveAuth(action.auth)),
      switchMapTo([
        ProfileActions.loadProfile(),
        RouterActions.go({path: ['invoice-editor']}),
      ]),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(action => this.authService.cleanAuth()),
      switchMapTo([
        RouterActions.go({path: ['login']}),
        AuthActions.logoutSuccess()
      ]),
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {
  }
}
