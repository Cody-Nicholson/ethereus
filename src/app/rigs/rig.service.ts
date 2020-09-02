import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpJsonService } from '../core/json-api';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export interface Rig {
    ip: string;
    name: string;
}

@Injectable()
export class RigService extends HttpJsonService {

    private selected = new ReplaySubject<any>(1);

    constructor(protected http: Http) {
        super();
        let ip = localStorage.getItem('rigIp');
        if(!ip){
            return
        }
        this.selected.next({ ip });

        this.get(ip)
            .subscribe(rig => {
                this.selected.next(rig);
            })
    }

    getSelected() {
        return this.selected.asObservable();
    }

    setSelected(rig: Rig) {
        localStorage.setItem('rigIp', rig.ip);
        this.selected.next(rig);
    }

    public get baseApi() {
        return `${environment.rigApi}/rigs`;
    }

    get(ip: string) {
        return this.http.get(`${this.baseApi}/${ip}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getAll(): Observable<Rig[]> {
        return this.http.get(`${this.baseApi}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    put(rig: Rig) {
        return this.http.put(`${this.baseApi}/${rig.ip}`, rig)
            .map(this.extractData)
            .catch(this.handleError);
    }

    delete(rig: Rig) {
        return this.http.delete(`${this.baseApi}/${rig.ip}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

}

