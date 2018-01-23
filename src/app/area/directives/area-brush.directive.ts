import {Directive, OnInit} from '@angular/core';
import {AreaGraphComponent} from '../area-graph.component';
import {brushX, brushSelection} from 'd3-brush';
import {event} from 'd3-selection';

@Directive({
    selector: '[areaBrush]',
})
export class AreaBrushDirective {

    area: AreaGraphComponent;
    brush: any;
    brushGroup: any;

    constructor(area: AreaGraphComponent) {
        this.area = area;
    }

    ngOnInit() {
        this.area.rendered.subscribe(r => {
            this.brush = brushX()
                .extent([[0, 0], [this.area.width, this.area.height]])
                .on("end", () => {
                    this.brushEnd()
                });

            this.brushGroup = this.area.chart
                .append("g")
                .attr("class", "x brush")
                .call(this.brush);
        });
    }

    brushEnd() {
        if (!event.sourceEvent) return; // Only transition after input.
        if (!event.selection) return; // Ignore empty selections.

        let domain = event.selection.map(this.area.xScale.invert);
        this.area.xScale.domain(domain);
        this.brushGroup.call(this.brush.move, null);
        //this.area.updateAxis();
        this.area.updateAreas();
        this.area.updateLines();
        this.area.updated.emit();
    }
}