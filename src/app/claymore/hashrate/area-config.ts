import { AreaChartConfig } from "../../area/index";


export class HashConfig extends AreaChartConfig {

    constructor() {
        super();

        this.height = 400;

        this.areaFills = [
            {
                fill: '#006cdb',
                opacity: 0,
            },
            {
                fill: '#7AB1CA',
                opacity: 0,
            },
            {
                fill: '#C1ABD1',
                opacity: 0,
            },
            {
                fill: '#C1ABD1',
                opacity: 0,
            },
            {
                fill: '#C1ABD1',
                opacity: 0,
            },
            {
                fill: '#C1ABD1',
                opacity: 0,
            }
        ];

        this.lineStyles = [
            {
                stroke: '#006cdb',
                strokeWidth: '2px',
            },
            {
                stroke: '#82A5B6',
                strokeWidth: '2px',
            },
            {
                stroke: '#C1ABD1',
                strokeWidth: '2px',
            },
            {
                stroke: '#e6194b',
                strokeWidth: '2px',
            },
            {
                stroke: '#3cb44b',
                strokeWidth: '2px',
            },
            {
                stroke: '#411BD1',
                strokeWidth: '2px',
            }
        ];
    }
}