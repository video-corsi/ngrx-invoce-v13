import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceEditorComponent } from './invoice-editor.component';
import { PrintComponent } from './components/print/print.component';

const routes: Routes = [
  {
    path: 'print',
    component: PrintComponent
  },
  { path: '', component: InvoiceEditorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceEditorRoutingModule { }
