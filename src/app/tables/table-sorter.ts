import {SynTableHeaderComponent} from './syn-th.component';

export class TableSorter {

    activeHeader: SynTableHeaderComponent;
    direction: number;

    constructor() {
        this.direction = 1;
    }

    sort(header: SynTableHeaderComponent, data: any[], reverse: boolean) {

        if (this.activeHeader === header && reverse) {
            this.direction = -this.direction;
            header.reverseSort = !header.reverseSort;
        }
        else {
            this.direction = header.sortOrder;
        }

        this.activeHeader = header;
        let key = header.key;

        data.sort((a, b) => {
            if (a[key] === b[key]) {
                return 0;
            }
            else if (a[key] > b[key]) {
                return this.direction;
            }
            else {
                return -this.direction;
            }
        });
    }

}