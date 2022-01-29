import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { AppState } from '../../core.module';
import { getToken } from '../store/auth.selectors';
import * as RouterActions from '../../router/store/router.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(getToken).pipe(
      // first(),
      // Interceptor requires observable that complete
      // BETTER than first: avoid errors if there is no value
      take(1),
      switchMap(token => {
        const authReq = !!token ? req.clone({
          setHeaders: { Authorization: 'Bearer ' + token },
        }) : req;
        return next.handle(authReq)
          .pipe(
            catchError(err => {
              if (err instanceof HttpErrorResponse) {
                switch (err.status) {
                  case 401:
                    this.store.dispatch(RouterActions.go({ path: ['/login']}));
                    break;
                  default:
                  case 404:
                    console.log('do something with 404 error', err);
                    break;
                }
              }
              // return of(err);
              return throwError(err);
            }),
          );
      }),
    );
  }
}

