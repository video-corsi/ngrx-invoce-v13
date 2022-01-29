import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, map, takeUntil } from 'rxjs';
import { AppState } from '../../core';
import { getToken } from '../../core/auth/store/auth.selectors';

@Directive({
  selector: '[fbIfLogged]'
})
export class IfLoggedDirective implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  private hasView = false;

  constructor(
    private template: TemplateRef<any>,
    private view: ViewContainerRef,
    private store: Store<AppState>,
  ) {
  }

  ngOnInit() {
    this.store
      .pipe(
        select(getToken),
        map(token => !!token),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(isLogged => {
        if (isLogged && !this.hasView) {
          this.view.createEmbeddedView(this.template);
          this.hasView = true;
        } else if (!isLogged && this.hasView) {
          this.view.clear();
          this.hasView = false;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
