import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KpiCellComponent} from './kpi-cell.component';
import {KpiQueueBar} from './kpi-queue.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        KpiCellComponent,
        KpiQueueBar,
    ],
    exports: [
        KpiCellComponent,
        KpiQueueBar,
    ],
    providers: []
})
export class KpiCellModule {}