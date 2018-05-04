import {Component} from '@angular/core';

@Component({
    selector: 'syn-thead',
    template: `
         <ul class="thead">
            <li class="row">
              <ul class="tr">
                  <ng-content></ng-content>
              </ul>
           </li>
         </ul>
    `,
})

export class SynTableHeadComponent {

}
