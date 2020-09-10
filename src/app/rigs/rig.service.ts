import { Injectable } from '@angular/core';
import { HttpJsonService } from '../core/json-api';
import { environment } from '../../environments/environment';
import { ReplaySubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Rig {
    ip: string;
    name: string;
    gpus: string[];
}

@Injectable()
export class RigService extends HttpJsonService {

    private selected = new ReplaySubject<any>(1);

    constructor(protected http: HttpClient) {
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

    get(ip: string): Observable<Rig> {
        return this.http.get<Rig>(`${this.baseApi}/${ip}`);
    }

    getAll(): Observable<Rig[]> {
        return this.http.get(`${this.baseApi}`) as any;
    }

    put(rig: Rig) {
        return this.http.put(`${this.baseApi}/${rig.ip}`, rig);
    }

    delete(rig: Rig) {
        return this.http.delete(`${this.baseApi}/${rig.ip}`);
    }

}

