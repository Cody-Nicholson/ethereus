import {Component, Input, Output, EventEmitter, AfterContentInit, TrackByFunction} from '@angular/core';
import {SynTableHeaderComponent} from './syn-th.component';
import {TableSorter} from './table-sorter';
import {SynTableBodyComponent} from './syn-tbody.component';


@Component({
    selector: 'syn-table',
    template: `
       <ng-content></ng-content>
    `,
})

export class SynTableComponent implements AfterContentInit {

    private tableRows: Array<any>;

    @Input()
    set rows(rows) {
        this.tableRows = rows;
        if (this.activeHeader && !this.disableDefaultSorter) {
            this.sortByHeader(this.activeHeader);
        }
        if (this.tableBody) {
            this.tableBody.rows = this.tableRows;
        }
    }

    get rows(): Array<any> {
        return this.tableRows;
    }

    @Input() disableDefaultSorter: boolean = false;
    @Input() trackBy: TrackByFunction<any>;
    @Output() onSort: EventEmitter<SortAction> = new EventEmitter<SortAction>();

    activeHeader: SynTableHeaderComponent;
    tableHeaders: SynTableHeaderComponent[];
    tableBody: SynTableBodyComponent;
    sorter: TableSorter;

    constructor() {
        this.sorter = new TableSorter();
        this.tableHeaders = [];
        this.trackBy = () => {};
    }

    addHeader(header: SynTableHeaderComponent) {
        this.tableHeaders.push(header);
    }

    addBody(body: SynTableBodyComponent) {
        this.tableBody = body;
    }

    selectHeader(header: SynTableHeaderComponent) {
        this.tableHeaders.forEach((header: SynTableHeaderComponent) => {
            header.sorted = false;
        });
        header.sorted = true;
        this.activeHeader = header;
    }

    /* reverseIfActive: reverse the current sort order if the header is active
     *   - allows a fresh sort when new filteredRows are set with setter
     * */
    sortByHeader(header: SynTableHeaderComponent, reverseIfActive: boolean = false) {
        if (!this.disableDefaultSorter) {
            this.sorter.sort(header, this.tableRows, reverseIfActive);
        } else if (this.activeHeader === header) {
            header.reverseSort = !header.reverseSort;
        }
        this.selectHeader(header);
        let sortAsc = header.sortOrder === 1 ? !header.reverseSort : header.reverseSort;
        this.onSort.emit(new SortAction(header.key, sortAsc));
    }

    ngAfterContentInit() {
        this.tableHeaders.forEach((header) => {
            if (header.defaultSort) {
                // HACK revisit when issue is addressed https://github.com/angular/angular/issues/6005

                setTimeout(() => {
                    if (!this.disableDefaultSorter) {
                        this.sortByHeader(header);
                    }
                    this.selectHeader(header);
                });
            }

        });
    }

}

export class SortAction {
    constructor(public field: string,
                public orderAscending: boolean) {
    }
}