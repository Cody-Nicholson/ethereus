import { HttpJsonService } from "../core/json-api";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { mergeMap } from "rxjs/operators/mergeMap";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

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
            .map(this.extractData)
            .catch(this.handleError);
    }
}