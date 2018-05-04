import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParallelBarsDirective} from './parallel-bars.directive';
import {ParallelBarDirective} from './parallel-bar.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ParallelBarsDirective, ParallelBarDirective],
    exports: [ParallelBarsDirective, ParallelBarDirective]
})
export class ParallelBarsModule {
}
