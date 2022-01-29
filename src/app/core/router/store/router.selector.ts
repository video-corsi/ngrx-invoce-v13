import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../core.module';

export const selectRouter = createFeatureSelector<
  AppState,
  RouterReducerState
  >('router');
