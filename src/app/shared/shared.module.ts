import { ModuleWithProviders, NgModule } from '@angular/core';
import { IfLoggedDirective } from './directives/if-logged.directive';

@NgModule({
  declarations: [IfLoggedDirective],
  exports: [IfLoggedDirective],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
