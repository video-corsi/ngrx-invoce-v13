import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of, catchError, map, switchMap } from 'rxjs';
import * as ProfileActions from './profile.actions';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class ProfileEffects {

  loadProfile$ = createEffect(() => this.actions$.pipe(
    ofType(ProfileActions.loadProfile),
    switchMap(() => this.profileService.load()
      .pipe(
        map((result) => ProfileActions.loadProfileSuccess({user: result})),
        catchError((err) => of(ProfileActions.loadProfileFailed()))
      ))
    )
  );

  editProfile$ = createEffect(() => this.actions$.pipe(
    ofType(ProfileActions.editProfile),
    switchMap(({user}) => this.profileService.edit(user)
      .pipe(
        map((result) => ProfileActions.editProfileSuccess({user: result})),
        catchError(() => of(ProfileActions.editProfileFailed()))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
  ) {
  }
}
