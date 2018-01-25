import { AreaChartConfig } from "../../area/index";
import { ClaymoreChartConfig } from "../chart-config";

export class EthHashChartConfig extends ClaymoreChartConfig {

    constructor() {
        super();
        this.yDomainFn = (data) => [15, 35];
    }
}
