import {Directive, OnInit} from '@angular/core';
import {AreaGraphComponent} from '../area-graph.component';
import {AreaHoverDirective} from './area-hover.directive';

/*
 *  A Directive that creates a focus bar on a line graph on hover events
 */
@Directive({
    selector: '[areaFocus]',
})
export class AreaFocusDirective implements OnInit {

    area: AreaGraphComponent;
    areaHover: AreaHoverDirective;
    private focusBar;

    constructor(area: AreaGraphComponent, areaHover: AreaHoverDirective) {
        this.area = area;
        this.areaHover = areaHover;
    }

    ngOnInit() {
        console.log('[AreaFocus] Init');
        this.area.rendered.subscribe(r => {
            this.initEmitters();
            this.drawFocus();
        });
    }

    initEmitters() {
        this.areaHover.hoverPoints.subscribe((points) => {
            this.moveFocus(points[0].xCoord);
        });

        this.areaHover.mouseEnter.subscribe(() => {
            this.showFocus();
        });

        this.areaHover.mouseLeave.subscribe(() => {
            this.hideFocus();
        });
    }

    private drawFocus() {
        this.focusBar = this.area.chart
            .append('rect')
            .style('fill', '#93908C')
            .style('opacity', 0)
            .attr('class', 'focus-bar')
            .attr('width', 2)
            .attr('height', this.area.graphHeight);
    }

    private moveFocus(xCoord: number) {
        this.focusBar.attr('transform', `translate(${xCoord},0)`);
    }

    private showFocus() {
        this.focusBar.transition()
            .style('opacity', 1);
    }

    private hideFocus() {
        this.focusBar.transition()
            .style('opacity', 0);
    }

}