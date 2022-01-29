import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../../../../model';

@Component({
  selector: 'fb-clients-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      class="sidepanel sidepanel-right bg-light vscroller"
      [ngClass]="{'sidepanel-right-hide': !show}"
    >
      <fb-panel-client-header
        (closePanel)="closePanel.emit()"
        (addClient)="addClient.emit($event)"
      ></fb-panel-client-header>
      
      <div class="list-group">
        <small class="text-center" *ngIf="clients?.length"><em>Click to edit</em></small>

        <fb-panel-clients-item
          *ngFor="let client of clients"
          [client]="client"
          (editClient)="editClient.emit($event)"
        ></fb-panel-clients-item>
      </div>
    </div>
  `,
  styleUrls: ['./panel-clients.component.css']
})
export class PanelClientsComponent {
  @Input() show: boolean = false;
  @Input() clients: Client[] | null = null
  @Output() addClient: EventEmitter<Client> = new EventEmitter();
  @Output() editClient: EventEmitter<Client> = new EventEmitter();
  @Output() closePanel: EventEmitter<any> = new EventEmitter();
}
