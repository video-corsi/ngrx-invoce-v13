import { Component, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../core';
import { getActiveInvoice, getClientById } from '../../store/selectors';
import * as RouterActions from '../../../../core/router/store/router.actions';
import * as ProfileActions from '../../../../core/profile/store/profile.actions';
import { getProfileUser } from '../../../../core/profile/store/profile.selectors';
import { Observable } from 'rxjs';
import { Client, Invoice, User } from '../../../../model';

@Component({
  selector: 'fb-print',
  encapsulation: ViewEncapsulation.None,
  template: `

    <div class="text-center">
      <div class="btn-group">
        <button class="btn btn-outline-primary" (click)="goBack()">back</button>
        <button class="btn btn-primary" (click)="printDoc()">Print</button>
      </div>
    </div>


    <div class="container">

      <!--HEADER-->
      <div
        class="d-flex flex-row justify-content-between mt-3"
        *ngIf="(profile$ | async) as profile"
      >
        <div
          *ngIf="(invoice$ | async) as invoice"
          class="text-right"
        >
          <h4>CLIENT</h4>

          <div><strong>{{profile.name}}</strong></div>
          <div>{{profile?.address}}</div>
        </div>

        <div class="text-right">
          <h4>FROM</h4>
          <br>
          <div><strong>{{profile.name?.toUpperCase()}}</strong></div>
          <div>{{profile.address}}</div>
        </div>
      </div>

      <hr>

      <div *ngIf="(invoice$ | async) as invoice">
        <div>
          Invoice Number: <strong>{{invoice?.invoiceNumber}}</strong> ({{invoice.date | date}})
        </div>

        <div>Subject: {{invoice.subject}}</div>

        <hr>
        <h3>ITEMS</h3>

        <li
          *ngFor="let item of invoice.items"
          class="list-group-item"
        >
          <div class="d-flex flex-row justify-content-between">
          
            <div>{{item.text}}</div>
            <div>€ {{item.price}}</div>
          </div>

        </li>


        <div class="d-flex flex-row justify-content-end mt-3">
          <div class="text-right">
            <h5>Amount: € {{invoice.total | currency}}</h5>
            <h6>VAT: € {{invoice.total * 0.22 | currency }}</h6>
            <h5>Total: € {{invoice.total * 1.22 | currency}}</h5>
          </div>
        </div>


      </div>

      <!--<pre>{{$profile | async | json}}</pre>
      <pre>{{$invoice | async | json}}</pre>-->


    </div>
  `,
  styles: [`
    @media print {
      fb-navbar,
      .btn { 
        display: none;
      }
    }
  `]
})
export class PrintComponent {
  profile$: Observable<User> = this.store.pipe(select(getProfileUser));
  invoice$: Observable<Invoice | undefined> = this.store.pipe(select(getActiveInvoice));
  client$: Observable<Client | undefined> = this.store.pipe(select(getClientById));

  constructor(private store: Store<AppState>) {
    this.store.dispatch(ProfileActions.loadProfile());
  }

  goBack() {
    this.store.dispatch(RouterActions.go({ path: ['invoice-editor'] }));
  }

  printDoc() {
    window.print();
  }
}
