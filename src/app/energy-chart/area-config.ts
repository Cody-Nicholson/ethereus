import { AreaChartConfig } from "../area/area-graph-config";


export class AreaDemoConfig extends AreaChartConfig {

    constructor() {
        super();

        this.height = 400;

        this.areaFills = [
            {
                fill: '#006cdb',
                opacity: 0.1,
                'fill-opacity': 0.75,
                'stroke-width': '0',
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

        this.lineStyles = [
            {
                stroke: '#006cdb',
                strokeWidth: '2px',
            },
            {
               // opacity: 1,
                stroke: '#82A5B6',
                //strokeDashArray: '4, 4',
                strokeWidth: '3px',
            },
            {
               // opacity: 1,
                stroke: '#C1ABD1',
               // strokeDashArray: '4, 4',
                strokeWidth: '3px',
            }
        ];
    }
}