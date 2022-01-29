import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Auth, Credentials } from '../../model';
import { AppState } from '../../core';
import * as AuthActions from '../../core/auth/store/auth.actions';
import { Observable } from 'rxjs';
import { AuthState } from '../../core/auth/store/auth.reducer';

@Component({
  selector: 'fb-login',
  template: `
    <form #f="ngForm" (submit)="login(f.value)" class="container mt-5" style="max-width: 400px;">
      <h2>Invoice System</h2>

      <div *ngIf="(auth$ | async)?.error as error" class="alert alert-danger">
        Wrong credentials
      </div>

      <div class="form-group">
        <input type="text" [ngModel]="email" name="email" class="form-control" required>
      </div>
      <div class="form-group">
        <input type="password" [ngModel]="pass" name="password" class="form-control" required>
      </div>
      
      <button type="submit" class="btn btn-primary btn-block btn-lg">
        <i class="fas fa-sign-in-alt"></i> SIGN IN</button>
    </form>
  `,
  styles: []
})
export class LoginComponent {
  email = 'olivier@mail.com';
  pass = 'bestPassw0rd';
  auth$: Observable<AuthState> = this.store.pipe(select('auth'));

  constructor(private store: Store<AppState>) {}

  login(formData: Credentials) {
    const { email, password } = formData;
    this.store.dispatch(AuthActions.login({email, password}));
  }
}
