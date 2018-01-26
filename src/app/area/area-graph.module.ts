import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AreaGraphComponent} from './area-graph.component';
import {AreaHoverDirective} from './directives/area-hover.directive';
import {AreaFocusDirective} from './directives/area-focus.directive';
import {AreaAxisDirective} from './directives/area-axis.directive';
import {AreaBrushDirective} from './directives/area-brush.directive';
import { AreaGridDirective } from './directives/area-grid.directive';
import { AreaLegendComponent } from './legend/area-legend.component';

const AreaComponents = [
    AreaGraphComponent,
    AreaLegendComponent,
    AreaHoverDirective,
    AreaFocusDirective,
    AreaAxisDirective,
    AreaBrushDirective,
    AreaGridDirective
];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...AreaComponents
    ],
    exports: [
        ...AreaComponents
    ],
    providers: [],
})
export class AreaGraphModule {
}
