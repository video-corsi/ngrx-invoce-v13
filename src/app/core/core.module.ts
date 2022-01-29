import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterReducerState, RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Auth } from '../model';
import { AuthService } from './auth/services/auth.service';
import { AuthInterceptor } from './auth/services/auth.interceptor';
import { AuthGuard } from './auth/services/auth.guard';
import { reducer as authReducer } from './auth/store/auth.reducer';
import { ProfileState, reducer as profileReducer } from './profile/store/profile.reducer';
import { RouterEffects } from './router/store/router.effects';
import { ProfileService } from './profile/services/profile.service';
import { ProfileEffects } from './profile/store/profile.effects';
import { AuthEffects } from './auth/store/auth.effects';

export interface AppState {
  auth: Auth;
  profile: ProfileState;
  router: RouterReducerState;
}

@NgModule({
  imports: [
    StoreModule.forRoot(
      {
        auth: authReducer,
        profile: profileReducer,
        router: routerReducer
      },

      {
        // metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
        }
      }),
    StoreDevtoolsModule.instrument({
      maxAge: 24
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal
    }),
    EffectsModule.forRoot([
      AuthEffects,
      RouterEffects,
      ProfileEffects
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ProfileService
  ]
})
export class CoreModule {
}
