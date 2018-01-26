import {
    Component,
    OnChanges,
    AfterViewInit,
    Input,
    Output,
    ElementRef,
    ViewChild,
    EventEmitter,
    HostListener
} from '@angular/core';
import { SvgGraphComponent } from '../core/svg-charts';
import { AreaChartData, AreaFill } from '../core/chart-api';
import { AreaChartConfig } from './area-graph-config';
import { scaleTime, scaleLinear } from 'd3-scale';
import { area, line } from 'd3-shape';
import { extent } from 'd3-array';
import { curveCardinal, curveMonotoneX } from 'd3';


@Component({
    selector: 'area-graph',
    template: `
      <div #container
           class="area-graph">
          <ng-content></ng-content>
      <div>
    `,
})
export class AreaGraphComponent extends SvgGraphComponent implements OnChanges, AfterViewInit {

    @Input() data: AreaChartData;
    @Input() config: AreaChartConfig;
    @Output() rendered = new EventEmitter<any>();
    @Output() updated = new EventEmitter<any>();

    @ViewChild('container') element: ElementRef;

    xScale: any;
    yScale: any;
    areaGroups: any;

    constructor(element: ElementRef) {
        super();
        this.element = element;
        this.isPageVisible = !document.hidden;
    }

    ngOnInit() {
        console.log('[AreaGraph] ngOnInit');
    }

    ngOnChanges() {
        this.render();
    }

    ngAfterViewInit() {
        this.initContainer(this.element);
        console.log(this.config)
        this.margin = this.config.margin;
        this.width = this.graphWidth;
        this.height = this.graphHeight;
        this.buildSVG();
        this.buildChart();
        this.xScale = scaleTime()
            .clamp(true)
            .nice(3)
            .range([0, this.width]);
        this.yScale = scaleLinear().range([this.height, 0]);
        this.render();
    }

    /* Based on container size */
    get graphWidth() {
        return this.htmlElement.offsetWidth - this.margin.left - this.margin.right;
    }

    get graphHeight() {
        return this.config.height - this.margin.top - this.margin.bottom;
    }

    render() {
        if (!this.canRender()) {
            return
        }
        if (!this.initGraph) {
            this.init();
            this.rendered.emit(true);
            this.initGraph = true;
        } else {
            this.update();
            this.updated.emit(true);
        }
    }

    init() {
        if (this.data.length === 0) {
            return
        };
        this.groupAreas();
        this.setScaleDomain();
        this.drawAreas();
        this.drawLines();
    }

    update() {
        // Allow lines to be rendered with the first line (this.data[0]) being on top
        // The highest svg "z-index" is the last element in the DOM
        this.areaGroups.data(this.data.concat().reverse());
        this.setScaleDomain();
        this.updateAreas();
        this.updateLines();
    }

    private groupAreas() {
        this.areaGroups = this.chart.selectAll('.area-group')
            .data(this.data.concat().reverse()) //reverse data order so 1st line is rendered on top (last svg element)
            .enter()
            .append('g')
            .attr('class', 'area-group');
    }

    private getMax(data: AreaChartData, key: string): number {
        let maxValuesOfAreas = [];
        data.forEach(lines => maxValuesOfAreas.push(Math.max.apply(Math, lines.map(d => d[key]))));
        return Math.max(...maxValuesOfAreas);
    }

    private getMin(data: AreaChartData, key: string): number {
        let minValuesOfAreas = [];
        data.forEach(lines => minValuesOfAreas.push(Math.min.apply(Math, lines.map(d => d[key]))));
        return Math.min(...minValuesOfAreas);
    }

    private setScaleDomain() {

        let xExtent = (data: AreaChartData): [number, number] => {
            return extent(data[0], d => d.x);
        }

        let yExtent = (data: AreaChartData): [number, number] => {
            return [0, this.getMax(data, 'y')]
        }
        let xDomainFn = this.config.xDomainFn || xExtent;
        let yDomainFn = this.config.yDomainFn || yExtent;

        // Each line should have the same x range
        this.xScale.domain(xDomainFn(this.data));
        this.yScale.domain(yDomainFn(this.data));
    }

    // Allows gaps in the graph for missing data
    private isDefined(d: any) {
        return typeof d.x === 'number' && typeof d.y === 'number'
    }

    // get area fill styles
    getFill(i: number): AreaFill {
        return this.config.getAreaFill(this.data.length - i - 1);
    }

    private drawAreas() {
        this.areaGroups.append('path')
            .attr('class', 'area')
            .each((d, i, nodes) => this.setStyles(nodes, i, (i) => this.getFill(i)))
            .attr('d', area()
                .defined(this.isDefined)
                .x((d: any) => this.xScale(d.x))
                .y0(this.height)
                .y1((d: any) => this.yScale(d.y))
            );
    }

    private drawLines() {
        this.areaGroups.append('path')
            .attr('class', 'line')
            .each((d, i, nodes) => this.setStyles(nodes, i, (i) => this.config.getLineStyle(nodes.length - i - 1)))
            .attr('d', this.getLineGeometry());
    }

    updateTransitionAreas() {
        this.transition(this.areaGroups.select('.area'))
            .attr('d', this.getArea());
    }

    updateAreas() {
        this.areaGroups.select('.area')
            .attr('d', this.getArea());
    }

    updateTransitionLines() {
        this.transition(this.areaGroups.select('.line'))
            .attr('d', this.getLineGeometry());
    }

    updateLines() {
        this.areaGroups.select('.line')
            .attr('d', this.getLineGeometry());
    }

    private getLineGeometry() {
        return line()
            .defined(this.isDefined)
            .curve(curveMonotoneX)
            .x((d: any) => this.xScale(d.x))
            .y((d: any) => this.yScale(d.y))
    }

    private getArea() {
        return area()
            .defined(this.isDefined)
            .curve(curveMonotoneX)
            .x((d: any) => this.xScale(d.x))
            .y0(this.height)
            .y1((d: any) => this.yScale(d.y))
    }
}