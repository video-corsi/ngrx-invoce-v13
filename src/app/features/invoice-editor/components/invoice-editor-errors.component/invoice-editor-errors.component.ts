import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HttpStatus } from '../../../../model';

@Component({
  selector: 'fb-invoice-editor-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="alert alert-danger" *ngIf="error?.type === 'error'">
      <div [ngSwitch]="error?.reason">
        <div *ngSwitchCase="'initInvoiceEditorFailed'">Initialization error</div>
        <div *ngSwitchCase="'editInvoiceFailed'">Edit Invoice Failed</div>
        <div *ngSwitchCase="'addInvoiceFailed'">Add Invoice Failed</div>
        <div *ngSwitchCase="'deleteInvoiceFailed'">Deleve Invoice Failed</div>
        <div *ngSwitchCase="'addClientFailed'">Add Client Failed</div>
        <div *ngSwitchCase="'editClientFailed'">Edit Client Failed</div>
      </div>
    </div>
  `
})
export class InvoiceEditorErrorsComponent {
  @Input() error?: HttpStatus | null = null;
}
