import { AreaChartData } from "./chart-api";
import { TimedSeriesItem, ClaymoreService } from "../claymore/claymore.service";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";


export abstract class ChartSeriesComponent {

    areaData: AreaChartData;
    kpiMin: number = Infinity;
    kpiMax: number = 0;
    kpiAvg: number;
    kpiTotal: number = 0;

    alias: string = "1H";
    poll: Subscription;

    constructor() {
    }

    abstract query(): Observable<TimedSeriesItem[][]>;

    setAlias(alias: string) {
        this.alias = alias;
        this.stopPoll();
        this.startPoll();
    }

    ngOnInit() {
        this.startPoll()
    }

    setData(data: TimedSeriesItem[][]) {
        this.areaData = ClaymoreService.getPoints(this.alias, data);
        this.setKpiData(data);
    }

    setKpiData(data: TimedSeriesItem[][]) {
        this.kpiMin = ClaymoreService.getTimedMin(data);
        this.kpiMax = ClaymoreService.getTimedMax(data);
        this.kpiAvg = ClaymoreService.getTimedAverage(data);
        this.kpiTotal = ClaymoreService.getTimedTotal(data);
    }

    startPoll() {
        this.poll = Observable.timer(0, 5000)
            .mergeMap(i => {
                return this.query()
            })
            .subscribe((data) => {
                this.setData(data);
            })
    }

    stopPoll() {
        this.poll.unsubscribe();
    }

    ngOnDestroy() {
        this.stopPoll();
    }

}