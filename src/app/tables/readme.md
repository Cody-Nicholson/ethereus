### Usage
```typescript
import { TableModule } from '@synergetic/core';
// or
import { TableModule } from '@synergetic/core/tables/table.module';

```
### Annotations
```typescript

// Table Component
@Component({
    selector: 'syn-table',
})
export class SynTableComponent implements AfterContentInit {
    @Input() rows: any[];
    @Input() trackBy: TrackByFn;
    @Input() disableDefaultSorter: boolean = false;
    @Output() onSort: EventEmitter<SortTerm> = new EventEmitter<SortTerm>();
}

// Table Header Component
@Component({
    selector: '[synTh]',
})

export class TableHeaderComponent {
    @Input() label: string;
    @Input() key: string;
    @Input() defaultSort: boolean;
    @Input() sortable: boolean = true;
    @Input() sortOrder: number = 1;
}


```
