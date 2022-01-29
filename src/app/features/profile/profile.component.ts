import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../core';
import { User } from '../../model';
import * as ProfileActions from '../../core/profile/store/profile.actions';
import { getProfile } from '../../core/profile/store/profile.selectors';

@Component({
  selector: 'fb-profile',
  template: `
    <form
        class="container" style="max-width: 400px;"
        #f="ngForm"
        (submit)="save(f.value)"
        *ngIf="(profile$ | async) as profile"
    >
      <h3>Your Profile</h3>

      <div class="alert alert-danger" *ngIf="profile.error">
        Server side error
      </div>

      <div class="form-group">
        <input class="form-control" type="text" [ngModel]="profile.user.name" name="name" required>
      </div>
      <div class="form-group">
        <input class="form-control" type="text" [ngModel]="profile.user.address" name="address">
      </div>
      <div class="form-group">
        <input class="form-control" type="text" [ngModel]="profile.user.email" name="email">
      </div>
      
      <button type="submit" class="btn btn-lg btn-block btn-primary" [disabled]="f.invalid">UPDATE</button>
    </form>
  `,
})
export class ProfileComponent {
  profile$ = this.store.pipe(select(getProfile));

  constructor(private store: Store<AppState>) {
    this.store.dispatch(ProfileActions.loadProfile());
  }

  save(user: Partial<User>) {
    this.store.dispatch(ProfileActions.editProfile({user}));
  }
}
