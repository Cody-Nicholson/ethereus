import {Directive, HostBinding} from '@angular/core';

@Directive({
    selector: 'ul[headers]',
})
export class SynTableHeadersUL {
    @HostBinding('class') tr = 'tr';
}
