import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Input } from '@angular/core';
import { EnergyService } from './energy-chart.service';
import { ClaymoreService } from '../claymore/claymore.service';
import { mean } from 'lodash';
import { ChartSeriesComponent } from '../core/ChartSeriesComponent';
import { energyIPs } from '../../../config';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'energy-component',
    templateUrl: './energy.component.html',
})
export class EnergyComponent extends ChartSeriesComponent implements OnInit {

   // kpiTotal: number;

    constructor(public energy: EnergyService) {
        super();
    }

    query(): any{

        let energy$ = energyIPs.map(ip => this.energy.getTimedPowerSeries(ip, this.alias))

        return combineLatest(energy$).pipe(
            map(d1 => {
                return d1[0]
            }),
        )
        // .subscribe(data => {
          
        //     this.areaData = ClaymoreService.getPoints(this.alias, data);
        //     this.kpiMin = Math.min(...data[0].concat(data[1]));
        //     this.kpiMax = Math.max(...data[0].concat(data[1]));
        //     this.kpiAvg = mean(data[0].concat(data[1]));
        // });
    }

}
