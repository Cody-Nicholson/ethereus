import {Directive, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {AreaGraphComponent} from '../area-graph.component';
import {LineGraphHoverValue, GraphPoint} from '../../core/chart-api';
import {mouse} from 'd3-selection';
import {interpolateNumber} from 'd3-interpolate';

/*
 * A directive that emits hovered point values on an area graph, and mouse enter / exit events
 *
 */
@Directive({
    selector: '[areaHover]'
})
export class AreaHoverDirective implements OnInit {

    @Input() areaHover: 'snap' | 'interpolate';
    @Output() hoverPoints = new EventEmitter<LineGraphHoverValue[]>();
    @Output() mouseEnter = new EventEmitter<any>();
    @Output() mouseLeave = new EventEmitter<any>();

    area: AreaGraphComponent;
    private lineFn: any;

    constructor(area: AreaGraphComponent) {
        this.area = area;
    }

    ngOnInit() {
        this.areaHover = this.areaHover || 'snap';
        this.area.rendered.subscribe(r => {
            this.init();
        });
    }

    init() {
        this.area.svg
            .on('mousemove', () => this.mouseHover())
            .on('mouseleave', () => this.onMouseLeave())
            .on("mouseenter", () => this.onMouseEnter());
    }

    /* Limit x-coord to the inner graph group (inside margins) */
    private getBoundedCursorRange(coords: [number, number]): [number, number] {
        let x = coords[0] - this.area.margin.left;
        x = Math.max(0, x);
        x = Math.min(this.area.graphWidth, x);
        return [x, coords[1]];
    }

    mouseHover() {
        let mouseCoords: [number, number] = mouse(this.area.htmlElement);
        let points;
        if(this.areaHover === 'snap'){
            points = this.getSnappedCursorLineValues(this.getBoundedCursorRange(mouseCoords));
        }else{
            points = this.getInterpolatedCursorLineValues(this.getBoundedCursorRange(mouseCoords));
        }
        this.hoverPoints.emit(points);
    }

    onMouseEnter() {
        this.mouseEnter.emit();
    }

    onMouseLeave() {
        this.mouseLeave.emit();
    }

    private getSnappedCursorLineValues(coords: [number, number]): LineGraphHoverValue[] {
        let xCoord = coords[0],
            xValue = this.area.xScale.invert(xCoord), //value on mouse cursor
            yValue,
            p0, p1,                         // data value in values array
            rightIndex,                     // index of data point after mouse cursor
            range;

        return this.area.data.map((points: GraphPoint[], i: number) => {
            rightIndex = this.area.config.bisectRight(points, xValue);
            p0 = points[rightIndex - 1];
            p1 = points[rightIndex] || p0;
            p0 = p0 || p1;

            range = p1.x - p0.x;

            if ((xValue - p0.x) / range < .5) {
                xValue = p0.x;
                xCoord = this.area.xScale(p0.x);
                yValue = p0.y;
            } else {
                xValue = p1.x;
                xCoord = this.area.xScale(p1.x);
                yValue = p1.y;
            }

            return {
                x: xValue,
                y: yValue,
                xCoord,
                yCoord: this.area.yScale(yValue) + this.area.margin.top,
            };
        });
    }

    /* Get approximate line values */
    private getInterpolatedCursorLineValues(coords: [number, number]): LineGraphHoverValue[] {
        let xCoord = coords[0],
            xValue = this.area.xScale.invert(xCoord), //value on mouse cursor
            p0, p1,                         // data value in values array
            rightIndex,                     // index of data point after mouse cursor
            yValue, interpolate, range;

        return this.area.data.map((points: GraphPoint[], i: number) => {
            rightIndex = this.area.config.bisectRight(points, xValue);
            p0 = points[rightIndex - 1];
            p1 = points[rightIndex] || p0;
            p0 = p0 || p1;

            if (p0.y === null || p1.y === null) {
                return {
                    x: xValue,
                    y: null,
                    xCoord,
                    yCoord: null,
                }; //missing data
            }

            range = p1.x - p0.x;
            interpolate = interpolateNumber(p0.y, p1.y);
            yValue = interpolate((xValue - p0.x) / range || 1); //y value between d0 and d1

            if (p0 == p1) {
                yValue = p0.y;
            }

            return {
                x: xValue,
                y: yValue,
                xCoord,
                yCoord: this.area.yScale(yValue) + this.area.margin.top,
            };
        });

    }

}