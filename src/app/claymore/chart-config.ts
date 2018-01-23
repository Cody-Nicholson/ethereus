import { AreaChartConfig } from "../area/index";

export class ClaymoreChartConfig extends AreaChartConfig {

    constructor() {
        super();

        this.height = 400;

        this.areaFills = new Array(6).fill(1).map(() => {
          return {fill: '#FFF', opacity: 0}
        });

        this.lineStyles = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6"].map((c) => {
          return {stroke: c, strokeWidth: '2px'}
        });


    }
}
