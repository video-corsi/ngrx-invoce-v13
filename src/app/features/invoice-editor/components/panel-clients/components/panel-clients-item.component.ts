import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Client } from '../../../../../model';

@Component({
  selector: 'fb-panel-clients-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <div (click)="editHandler()">
        <div *ngIf="!isEditing"> {{client.name}}</div>
        <div *ngIf="isEditing" class="form-inline">
          <input
            class="form-control"
            type="text"
            #name
            [ngModel]="client.name" 
            (keyup.enter)="confirmHandler(name, $event)"
          >
          <i class="fa fa-check-circle ml-2" (click)="confirmHandler(name, $event)"></i>
          <i class="fa fa-times-circle ml-1" (click)="cancelHandler($event)"></i>
        </div>
      </div>
  `,
})
export class PanelClientsItemComponent {
  @Input() client!: Client;
  @Output() editClient: EventEmitter<Client> = new EventEmitter();
  @HostBinding() className = 'list-group-item';
  isEditing: boolean = false;


  editHandler() {
    this.isEditing = true;
  }

  confirmHandler(inputName: HTMLInputElement, event: Event) {
    event.stopPropagation();
    const client = { id: this.client.id, name: inputName.value } as Client;
    this.editClient.emit(client);
    this.isEditing = false;
  }

  cancelHandler(event: MouseEvent) {
    event.stopPropagation();
    this.isEditing = false;
  }

}
