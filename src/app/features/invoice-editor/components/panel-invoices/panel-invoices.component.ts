import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Invoice } from '../../../../model';

@Component({
  selector: 'fb-invoices-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      class="sidepanel sidepanel-left bg-light vscroller"
      [ngClass]="{'sidepanel-left-hide': show}"
    >
      <div class="row mb-3 h3">
        <div class="col">
          <i class="far fa-plus-square mr-1 text-primary" (click)="addHandler()"></i> INVOICES
        </div>
        <div class="col text-right">
          <i class="far fa-times-circle" (click)="closePanel.emit()"></i>
        </div>
      </div>
      
      <li
        class="list-group-item  list-group-item-action d-flex flex-row justify-content-between"
        *ngFor="let invoice of invoices"
        [ngClass]="{'active': invoice.id === activeInvoice?.id }"
        (click)="setActiveInvoice.emit(invoice)"
      >
        <div>
          <small>#{{invoice.invoiceNumber}}.  {{invoice.date | date}}</small> 
          <div>{{invoice.subject}} </div>
        </div> 
 
        <div>
          <span>{{invoice.total | currency}} </span>
          <i class="fas fa-trash-alt" (click)="deleteHandler(invoice, $event)"></i>
        </div>
      </li>
    </div>
  `,
  styleUrls: ['./panel-invoices.component.css']
})
export class PanelInvoicesComponent {
  @Input() show: boolean = false;
  @Input() invoices: Invoice[] | null = null;
  @Input() activeInvoice: Invoice | undefined | null = null;
  @Output() createNewInvoice: EventEmitter<any> = new EventEmitter();
  @Output() setActiveInvoice: EventEmitter<Invoice> = new EventEmitter();
  @Output() delete: EventEmitter<Invoice> = new EventEmitter();
  @Output() closePanel: EventEmitter<any> = new EventEmitter();

  addHandler() {
    this.createNewInvoice.emit();
  }

  deleteHandler(invoice: Invoice, event: MouseEvent) {
    event.stopPropagation();
    this.delete.emit(invoice);
  }
}
