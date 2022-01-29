import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Client } from '../../../../../model';

@Component({
  selector: 'fb-panel-client-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `

    <div class="row mb-3">
      <div class="col-8">
        <!--TITLE-->
        <div *ngIf="!isAdding" class="h3">
          <i class="fa fa-plus-circle mr-1 text-primary" (click)="addHandler()"></i>
          CLIENTS
        </div>

        <!--Form ADD CLIENT-->
        <div class="form-inline" *ngIf="isAdding">
          <input
            type="text" class="form-control mr-2"
            [(ngModel)]="clientName"
            (keyup.enter)="confirmHandler()"
            #input
            placeholder="Client Name"
          >
          <i class="fa fa-check-circle fa-2x mr-1" (click)="confirmHandler()"></i>
          <i class="fa fa-times-circle fa-2x" (click)="cancelHandler()"></i>
        </div>
      </div>

      <div class="col-4 text-right h3">
        <i
          *ngIf="!isAdding"
          class="fa fa-times-circle title "
          (click)="closePanel.emit()"></i>
      </div>
    </div>
  `,

})
export class PanelClientsHeaderComponent {
  @Output() addClient: EventEmitter<Client> = new EventEmitter();
  @Output() closePanel: EventEmitter<any> = new EventEmitter();
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  isAdding: boolean = false;
  clientName: string | null = null;

  constructor(private cd: ChangeDetectorRef) {}

  addHandler() {
    this.isAdding = true;
    this.clientName = null;
    this.cd.detectChanges();
    this.input.nativeElement.focus();
  }

  confirmHandler() {
    if (this.clientName) {
      this.addClient.emit({ name: this.clientName} as Client);
      this.isAdding = false;
    }
  }

  cancelHandler() {
    this.isAdding = false;
  }
}
