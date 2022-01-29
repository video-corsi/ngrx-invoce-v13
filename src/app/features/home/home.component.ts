import { Component } from '@angular/core';

@Component({
  selector: 'fb-home',
  template: `
    <div class="container text-center">
      <h1>WELCOME TO INVOICE</h1>
      <h3>An Angular 8 / NGRX 8 Demo</h3>
      
      <button
        routerLink="/invoice-editor"
        class="btn btn-primary btn-lg">GO TO INVOICES</button>
    </div>
  `,
})
export class HomeComponent {}
