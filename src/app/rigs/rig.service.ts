import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export interface Rig {
    ip: string;
    name: string;
}

@Injectable()
export class RigService {

    constructor(protected localStorage: AsyncLocalStorage) {

    }

    getAll(): Observable<Rig[]> {
        return this.localStorage.getItem('rigs');
    }

    add(rig: Rig){

    }

    setAll(rigs: Rig[]) {
        return this.localStorage.setItem('rigs', rigs);
    }

}