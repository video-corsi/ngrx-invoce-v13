import { Component } from '@angular/core';

@Component({
  selector: 'fb-root',
  template: `
    <fb-navbar></fb-navbar>
    <!--<div class="container" style="max-width: 600px">-->
      <router-outlet></router-outlet>
    <!--</div>-->
  `,
  styles: []
})
export class AppComponent { }
