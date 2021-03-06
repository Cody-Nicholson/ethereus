import { Directive, OnInit } from '@angular/core';
import { axisLeft, axisBottom } from 'd3-axis';
import { AreaAxisDirective } from '../../area/directives/area-axis.directive';
import { AreaGraphComponent } from '../../area/area-graph.component';

/*
 * A directive that adds an x / y axis to an area chart
 *
 */
@Directive({
    selector: '[tempAxis]'
})
export class TempAxisDirective extends AreaAxisDirective implements OnInit {

    constructor(area: AreaGraphComponent) {
        super(area);
    }

    protected drawYAxis(): void {
        this.yAxis = axisLeft(this.area.yScale)
            .tickPadding(5)
            .tickSize(0)
            .tickValues([10, 20, 30, 40, 50, 60, 70]);

        this.yAxisGroup = this.area.chart.append('g')
            .attr('class', 'y axis')
            .call(this.yAxis);

        this.yAxisGroup.append('text')
            .attr('transform', 'rotate(-90)');
    }

}