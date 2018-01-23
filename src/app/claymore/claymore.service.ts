import { HttpJsonService } from "../core/json-api";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { mergeMap } from "rxjs/operators/mergeMap";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";


@Injectable()
export class ClaymoreService extends HttpJsonService {

    constructor(protected http: Http) {
        super();
    }

    public get baseApi() {
        return `${environment.claymoreApi}/claymore`;
    }

    get(): Observable<ClaymoreData> {
        return this.http.get(`${this.baseApi}/stats`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getEthHarshrates(): Observable<number[]> {
        return this.get()
            .map((data) => {
                return data.ethHash;
            })
    }

    getTemperatures(): Observable<number[]> {
        return this.get()
            .map(data => data.temps);
    }

    getFans(): Observable<number[]> {
        return this.get()
            .map(data => data.fans);
    }
}

export interface ClaymoreData {
    ethShares: number;
    dcrShares: number;
    ethRejects: number;
    dcrRejects: number;
    ethHash: number[];
    dcrHash: number[];
    temps: number[];
    fans: number[];
    pools: string;
    ver: string;
    uptime: number;
}