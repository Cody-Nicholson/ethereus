import { Component } from '@angular/core';
import { AreaDemoConfig } from './area-config';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { EnergyService } from './energy-chart.service';
import { Http } from '@angular/http/src/http';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'energy-chart',
    templateUrl: './energy-chart.component.html',
    styleUrls: ['./energy-chart.component.less']
})
export class EnergyChartComponent implements OnDestroy {

    areaData: any = [{ x: 1, y: 1 }];
    areaConfig: any;

    poll: Subscription;

    constructor(private energy: EnergyService) {
        this.areaConfig = new AreaDemoConfig();
        this.areaData = [[]]

        this.poll = this.pollEnergy()
            .subscribe(data => {
                let point: any = {
                    x: +(new Date()) - 3600000,
                    y: data.power
                };
                this.areaData[0].push(point);
                if (this.areaData[0].length > 200) {
                    this.areaData[0].shift()
                }
                this.areaData = this.areaData.concat()
            });
    }

    pollEnergy() {
        return Observable.interval(1000)
            .mergeMap(i => {
                return this.energy.get()
            })
    }

    ngOnDestroy(){
        console.log('on dest')
        this.poll.unsubscribe();
    }

}