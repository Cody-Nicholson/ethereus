import { ClaymoreChartConfig } from "../chart-config";

export class DualHashChartConfig extends ClaymoreChartConfig {

    constructor() {
        super();
        this.yDomainFn = (data) => [800, 1500];
    }
}
