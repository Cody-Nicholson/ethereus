import {GraphMargin, AreaFill, LineStyle, AreaChartData} from '../core/chart-api';
import {bisector} from 'd3-array';
import {AxisDate} from '../core/date-format';


export class AreaChartConfig {
    width: number;
    height: number = 300;
    margin: GraphMargin = {top: 20, right: 20, bottom: 40, left: 40};
    bisectRight: any;
    xAxisFormatter: (d: any) => any = new AxisDate().format;
    yAxisFormat: string;
    xDomainFn: (data: AreaChartData) => [number, number];
    yDomainFn: (data: AreaChartData) => [number, number];

    constructor() {
        this.bisectRight = bisector((d: any) => d.x).right;
    }

    areaFills: AreaFill[] = [
        {
            fill: '#564aa3',
            opacity: 0.1,
        },
        {
            fill: '#7AB1CA',
            opacity: .3,
        },
        {
            fill: '#C1ABD1',
            opacity: .3,
        }
    ];

    lineStyles: LineStyle[] = [
        {
            stroke: '#598DA5',
            strokeWidth: '2px',
        },
        {
            opacity: 1,
            stroke: '#82A5B6',
            strokeDashArray: '4, 4',
            strokeWidth: '1px',
        },
        {
            opacity: 1,
            stroke: '#C1ABD1',
            strokeDashArray: '4, 4',
            strokeWidth: '1px',
        }
    ];

    getAreaFill(i: number) {
        return this.areaFills[i];
    }

    getLineStyle(i: number) {
        let style = this.lineStyles[i];
        return {
            fill: 'none',
            opacity: style.opacity,
            stroke: style.stroke,
            'stroke-dasharray': style.strokeDashArray,
            'stroke-width': style.strokeWidth
        }
    }
}