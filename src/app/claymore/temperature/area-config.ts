import { AreaChartConfig } from "../../area/index";
import { ClaymoreChartConfig } from "../chart-config";


export class TempChartConfig extends ClaymoreChartConfig {

    constructor() {
        super();
        this.yDomainFn = (data) => [40, 70];
    }
}

export class FanChartConfig extends ClaymoreChartConfig {

    constructor() {
        super();
        this.yDomainFn = (data) => [0, 100];
    }
}