import { Type } from '@angular/core';
import { ClientsEffects } from './clients.effects';
import { InvoicesEffects } from './invoices.effects';
import { InvoicesEditorEffects } from './invoices-editor.effects';

export const effects: Type<any>[] = [
  ClientsEffects,
  InvoicesEffects,
  InvoicesEditorEffects
];
