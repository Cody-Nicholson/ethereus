import { AreaChartConfig } from "../area/area-graph-config";


export class ClaymoreChartConfig extends AreaChartConfig {

  constructor() {
    super();

    this.height = 400;

    this.areaFills = new Array(6).fill(1).map(() => {
      return { fill: '#FFF', opacity: 0 }
    });

    this.margin.left = 70;
    this.margin.right = 50;
    this.margin.top = 30;

    this.lineStyles = [
      "#564aa3",
      "#23b7e5",
      "#27b6af",
      "#dc3912",
      "#ff9900",
      "#109618",
      // "#990099",
      // "#0099c6",
      //"#3366cc",
    ].map((c) => {
      return { stroke: c, strokeWidth: '2px' }
    });
  }
}

export class TempChartConfig extends ClaymoreChartConfig {

  constructor() {
    super();
    this.yDomainFn = (data) => [40, 70];
    this.margin.left = 40;
  }
}

export class FanChartConfig extends ClaymoreChartConfig {

  constructor() {
    super();
    this.yDomainFn = (data) => [0, 100];
  }
}
