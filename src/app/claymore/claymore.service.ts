import { HttpJsonService } from "../core/json-api";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { mergeMap } from "rxjs/operators/mergeMap";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { flatten, mean, minBy, maxBy, meanBy, sumBy} from 'lodash';
import { AreaChartData } from "../core/chart-api";

@Injectable()
export class ClaymoreService extends HttpJsonService {

    constructor(protected http: Http) {
        super();
    }

    public get baseApi() {
        return `${environment.claymoreApi}/claymore`;
    }

    getAll(ip: string = ' ', alias: string = '10M'): Observable<ClaymoreData[]> {
        return this.http.get(`${this.baseApi}/stats/${ip}/${alias}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getSnapshot(ip: string): Observable<ClaymoreData> {
        return this.http.get(`${this.baseApi}/snapshot/${ip}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getEthHarshrates(ip: string): Observable<number[]> {
        return this.getSnapshot(ip)
            .map((data) => {
                return data.ethHash;
            });
    }

    getTemperatures(ip: string): Observable<number[]> {
        return this.getSnapshot(ip)
            .map(data => data.temps);
    }

    getFanSeries(ip: string = ' ', alias: string = '1H'): Observable<number[][]> {
        return this.http.get(`${this.baseApi}/fans/${ip}/${alias}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getFanTimedSeries(ip: string = ' ', alias: string = '1H'): Observable<TimedSeriesItem[][]> {
        return this.http.get(`${this.baseApi}/fans/${ip}/${alias}/timed`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getEthTimedSeries(ip: string = ' ', alias: string = '1H'): Observable<TimedSeriesItem[][]> {
        return this.http.get(`${this.baseApi}/eth/${ip}/${alias}/timed`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getDualTimedSeries(ip: string = ' ', alias: string = '1H'): Observable<TimedSeriesItem[][]> {
        return this.http.get(`${this.baseApi}/dual/${ip}/${alias}/timed`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getTemperatureTimedSeries(ip: string = ' ', alias: string = '1H'): Observable<TimedSeriesItem[][]> {
        return this.http.get(`${this.baseApi}/temps/${ip}/${alias}/timed`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getTemperatureSeries(ip: string = ' ', alias: string = '1H'): Observable<number[][]> {
        return this.http.get(`${this.baseApi}/temps/${ip}/${alias}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getEthereumHashrateSeries(ip: string = ' ', alias: string = '1H'): Observable<number[][]> {
        return this.http.get(`${this.baseApi}/eth/${ip}/${alias}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getDualHashrateSeries(ip: string = ' ', alias: string = '1H'): Observable<number[][]> {
        return this.http.get(`${this.baseApi}/duel/${ip}/${alias}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    static getHashPoints(alias: string, series: number[][]){
        return series.map((line, i) => {
            return line.map((value, i) => {
                return {
                    x: +new Date() - aliasToTime[alias] + i * 5000,
                    y: value/1000
                }
            })
        })
    }

    static getPoints(alias: string, series: TimedSeriesItem[][]): AreaChartData {
        return series.map((line, i) => {
            return line.map((point, i) => {
                return {
                    x: point.timestamp,
                    y: point.value
                }
            })
        })
    }

    static getTimedMin(series: TimedSeriesItem[][]): number{
        let min = minBy(flatten(series), 'value');
        return min ? min.value : 0;
    }

    static getTimedMax(series: TimedSeriesItem[][]): number{
        let max = maxBy(flatten(series), 'value');
        return max ? max.value : 0;
    }

    static getTimedAverage(series: TimedSeriesItem[][]){
        return meanBy(flatten(series), 'value') || 0;
    }

    static getTimedTotal(series: TimedSeriesItem[][]){
        return sumBy(series, (line) => {
            return line[line.length-1].value;
        }) || 0;
    }

    static getMin(series: number[][]){
        return Math.min(...flatten(series))
    }

    static getMax(series: number[][]){
        return Math.max(...flatten(series))
    }

    static getAverage(series: number[][]){
        return mean(flatten(series))
    }
    
}

export interface TimedSeriesItem{
    timestamp: number;
    value: number;
}

const oneMin = 1000 * 60;
const aliasToTime = {
    '10M': oneMin * 10,
    '30M': oneMin * 30,
    '1H': oneMin * 60,
    '2H': oneMin * 60 * 2,
    '6H': oneMin * 60 * 6,
    '12H': oneMin * 60 * 12,
    '1D': oneMin * 60 * 24
}

export interface ClaymoreData {
    ethShares: number;
    dcrShares: number;
    ethRejects: number;
    dcrRejects: number;
    ethInvalid: number;
    dcrInvalid: number;
    ethHash: number[];
    dcrHash: number[];
    temps: number[];
    fans: number[];
    pools: string;
    ver: string;
    uptime: number;
}