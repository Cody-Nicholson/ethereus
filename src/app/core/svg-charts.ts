import {ElementRef, HostListener} from '@angular/core';
import {select} from 'd3-selection';
import 'd3-transition';


export abstract class SvgGraphComponent {

    host: any;
    svg: any;
    htmlElement: any;
    data: any;
    margin: any;
    chart: any;
    width: number;
    height: number;
    initGraph: boolean;
    isPageVisible: boolean;

    @HostListener('document:visibilitychange', ['$event'])
    onVisibilityChange() {
        this.isPageVisible = !document.hidden;
        if (!this.isPageVisible) {
            this.interruptTransitions();
        } else{
            this.render();
        }
    }

    abstract init(): void;

    abstract update(): void;

    protected render() {
        if (!this.data) {
            return
        }
        if (!this.initGraph) {
            this.init();
            this.initGraph = true;
        } else {
            this.update();
        }
    }

    /* Must be run on child component before rendering */
    protected initContainer(ele: ElementRef) {
        this.htmlElement = ele.nativeElement;
        this.host = select(this.htmlElement);
        this.isPageVisible = !document.hidden;
    }

    protected canRender(): boolean{
        return this.data && this.host;
    }

    /* Apply styles to a node using an object literal */
    protected setStyles(nodes: any, i: number, styleAccessor: (i: number)=>any) {
        let styles = styleAccessor(i);
        for (let s of Object.keys(styles)) {
            if (styles[s] !== undefined) {
                select(nodes[i]).style(s, styles[s]);
            }
        }
    }

    /* Kill all running transitions */
    protected interruptTransitions() {
        this.svg.selectAll('*').interrupt();
    }

    /* Wrapper to only allow transitions on a visible page */
    transition(sel: any) {
        return this.isPageVisible ? sel.transition() : sel;
    }

    protected buildSVG(): void {
        this.svg = this.host.append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom);
    }

    protected buildChart() {
        this.chart = this.svg.append('g')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
    }

    protected buildRadialChart(radius: number) {
        this.chart = this.svg.append('g')
            .attr('transform', `translate(${this.margin.left + radius},${this.margin.top + radius})`);
    }
}