import {Directive, OnInit} from '@angular/core';
import {AreaGraphComponent} from '../area-graph.component';
import * as d3 from 'd3';
import {axisLeft, axisBottom} from 'd3-axis';

/*
 * A directive that adds an x / y axis to an area chart
 *
 */
@Directive({
    selector: '[areaGrid]'
})
export class AreaGridDirective implements OnInit {
    area: AreaGraphComponent;

    private yGrid;
    private yGridGroup;

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
        this.drawYGrid();
    }

    private drawYGrid(): void {
        this.yGrid = axisLeft(this.area.yScale)
            .ticks(5)
            .tickSize(-this.area.graphWidth)
            .tickFormat((d, i) => '')

        this.yGridGroup = this.area.chart.append('g')
            .attr('class', 'grid')
            .call(this.yGrid);
    }


    /* Animate Axis updates */
    updateAxis() {
        this.area.transition(this.yGridGroup)
            .call(this.yGrid);
    }

}