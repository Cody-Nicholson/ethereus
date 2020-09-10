import { HttpJsonService } from "../core/json-api";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { TimedSeriesItem } from "../claymore/claymore.service";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EnergyService extends HttpJsonService{

    get baseApi(): string{
        return `${environment.ethereusApi}`;
    }
    
    constructor(protected http: HttpClient) {
        super();
    }
    
    get(): Observable<any> {
        return this.http.get(`${this.baseApi}/energy`);
    }

    getPowerSeries(ip: string, alias: string = '1H'): Observable<TimedSeriesItem[][]> {
        return this.http.get<TimedSeriesItem[][]>(`${this.baseApi}/energy/power/${ip}/${alias}`)
    }

    getTimedPowerSeries(ip: string, alias: string = '1H'): Observable<TimedSeriesItem[][]> {
        return this.http.get<TimedSeriesItem[][]>(`${this.baseApi}/energy/power/${ip}/${alias}/timed`)
    }
}