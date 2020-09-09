import { HttpJsonService } from "../core/json-api";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { mergeMap } from "rxjs/operators/mergeMap";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { TimedSeriesItem } from "../claymore/claymore.service";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class EnergyService extends HttpJsonService{

    get baseApi(): string{
        return `${environment.ethereusApi}`;
    }
    
    constructor(protected http: Http) {
        super();
    }
    
    get(): Observable<any> {
        return this.http.get(`${this.baseApi}/energy`)
        .pipe(
            map(this.extractData),
            catchError(this.handleError),
        )
    }

    getPowerSeries(ip: string, alias: string = '1H'): Observable<TimedSeriesItem[][]> {
        return this.http.get(`${this.baseApi}/energy/power/${ip}/${alias}`)
        .pipe(
            map(this.extractData),
            catchError(this.handleError),
        )
    }

    getTimedPowerSeries(ip: string, alias: string = '1H'): Observable<TimedSeriesItem[][]> {
        return this.http.get(`${this.baseApi}/energy/power/${ip}/${alias}/timed`)
        .pipe(
            map(this.extractData),
            catchError(this.handleError),
        )
    }
}