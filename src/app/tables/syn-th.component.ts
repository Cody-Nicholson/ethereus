import {Component, Input} from '@angular/core';
import {SynTableComponent} from './syn-table.component';

@Component({
    selector: '[synTh]',
    template: `
        {{label || key}}
    `,
    host: {
        'class': 'td',
        '[class.active]': 'sorted',
        '[class.sortable]': 'sortable',
        '[class.sorted-desc]': 'sorted && reverseSort',
        '[class.sorted-asc]': 'sorted && !reverseSort',
        '(click)': 'sort()',
    },
})

export class SynTableHeaderComponent {

    @Input() label: string;
    @Input() key: string;
    @Input() defaultSort: boolean;
    @Input() sortable: boolean = true;
    @Input() sortOrder: number = 1;

    public table: SynTableComponent;
    public sorted: boolean = false;
    public reverseSort: boolean = false;

    sort() {
        if (!this.sortable) {
            return;
        }
       this.table.sortByHeader(this, true);
    }

    constructor(table: SynTableComponent) {
        this.table = table;
        this.table.addHeader(this);
    }
}
