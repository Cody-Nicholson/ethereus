import {Directive, OnInit} from '@angular/core';
import {AreaGraphComponent} from '../area-graph.component';
import * as d3 from 'd3';
import {axisLeft, axisBottom} from 'd3-axis';

/*
 * A directive that adds an x / y axis to an area chart
 *
 */
@Directive({
    selector: '[areaAxis]'
})
export class AreaAxisDirective implements OnInit {
    area: AreaGraphComponent;

    protected xAxis;
    protected yAxis;
    protected xAxisGroup;
    protected yAxisGroup;

    constructor(area: AreaGraphComponent) {
        this.area = area;
    }

    ngOnInit() {
        this.area.rendered.subscribe(r => {
            this.init();
        });

        this.area.updated.subscribe(r => {
            this.updateAxis();
        });
    }

    init(){
        this.drawXAxis();
        this.drawYAxis();
    }

    protected drawXAxis(): void {
        this.xAxis = axisBottom(this.area.xScale)
            .tickFormat(this.area.config.xAxisFormatter)
            .tickPadding(8)
            .tickSize(0)
            .tickSizeOuter(0);

        this.xAxisGroup = this.area.chart.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + this.area.height + ')')
            .call(this.xAxis);
    }

    protected drawYAxis(): void {
        this.yAxis = axisLeft(this.area.yScale)
            .tickPadding(7)
            .tickSize(0)
            .ticks(3);

        this.yAxisGroup = this.area.chart.append('g')
            .attr('class', 'y axis')
            .call(this.yAxis);

        this.yAxisGroup.append('text')
            .attr('transform', 'rotate(-90)');
    }

    /* Animate Axis updates */
    updateAxis() {
        this.area.transition(this.xAxisGroup)
            .call(this.xAxis);

        this.area.transition(this.yAxisGroup)
            .call(this.yAxis);
    }

}