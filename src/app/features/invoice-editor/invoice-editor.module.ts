import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './store/reducers';
import { effects } from './store/effects';
import { InvoiceEditorRoutingModule } from './invoice-editor-routing.module';
import { InvoiceEditorComponent } from './invoice-editor.component';
import { InvoicesService } from './store/services/invoices.service';
import { ClientsService } from './store/services/clients.service';
import { InvoiceEditorErrorsComponent } from './components/invoice-editor-errors.component/invoice-editor-errors.component';
import { PanelClientsComponent } from './components/panel-clients/panel-clients.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { PanelInvoicesComponent } from './components/panel-invoices/panel-invoices.component';
import { PanelClientsItemComponent } from './components/panel-clients/components/panel-clients-item.component';
import { PanelClientsHeaderComponent } from './components/panel-clients/components/panel-clients-header.component';
import { PrintComponent } from './components/print/print.component';

@NgModule({
  declarations: [
    InvoiceEditorComponent,
    // components
    InvoiceEditorErrorsComponent,
    InvoiceFormComponent,
    PanelClientsComponent, PanelClientsItemComponent, PanelClientsHeaderComponent,
    PanelInvoicesComponent,
    // routes
    PrintComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InvoiceEditorRoutingModule,
    StoreModule.forFeature('invoiceEditor', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [
    InvoicesService,
    ClientsService
  ]
})
export class InvoiceEditorModule { }
