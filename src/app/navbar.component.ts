import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from './core';
import * as AuthActions from './core/auth/store/auth.actions';
import { getProfile, getProfileUserName } from './core/profile/store/profile.selectors';

@Component({
  selector: 'fb-navbar',
  template: `
    <div *fbIfLogged class="sticky-top bg-primary text-white" >
      <div class="d-flex flex-row justify-content-end pt-3" >
        <h4 class="px-2 pt-1">
          {{username$ | async}}
        </h4>
        <div class="px-2 pl-2" routerLink="home" routerLinkActive="text-dark">
          <i class="fas fa-home fa-2x"></i>
        </div> 
        <div class="px-2 pl-2" routerLink="invoice-editor" routerLinkActive="text-dark">
          <i class="fas fa-receipt fa-2x"></i>
        </div>
        <div class="px-2 pl-2" routerLink="profile" routerLinkActive="text-dark">
          <i class="fas fa-user-circle fa-2x ml-1 mr-1"></i> 
        </div>
  
        <div class="px-2 pl-2" (click)="logout()" >
          <i class="fas fa-sign-out-alt fa-2x "></i>
        </div>
      </div>
      <hr>
    </div>
  `,

})
export class NavbarComponent  {
  username$ = this.store.pipe(select(getProfileUserName));

  constructor(private store: Store<AppState>) {}

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
