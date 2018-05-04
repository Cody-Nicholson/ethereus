import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SynTableComponent} from './syn-table.component';
import {SynTableHeadersUL} from './directives';
import {SynTableHeadComponent} from './syn-thead.component';
import {SynTableBodyComponent} from './syn-tbody.component';
import {SynTableHeaderComponent} from './syn-th.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        SynTableHeadersUL,
        SynTableComponent,
        SynTableHeadComponent,
        SynTableHeaderComponent,
        SynTableBodyComponent,
    ],
    exports: [
        SynTableHeadersUL,
        SynTableComponent,
        SynTableHeadComponent,
        SynTableHeaderComponent,
        SynTableBodyComponent,
    ],
})
export class TableModule {}