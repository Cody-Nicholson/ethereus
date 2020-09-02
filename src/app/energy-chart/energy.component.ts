import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Input } from '@angular/core';
import { EnergyService } from './energy-chart.service';
import { ClaymoreService } from '../claymore/claymore.service';
import { mean } from 'lodash';
import { ChartSeriesComponent } from '../core/ChartSeriesComponent';
import { energyIPs } from '../../../config';

@Component({
    selector: 'energy-component',
    templateUrl: './energy.component.html',
})
export class EnergyComponent extends ChartSeriesComponent implements OnInit {

   // kpiTotal: number;

    constructor(public energy: EnergyService) {
        super();
    }

    query(){

        return Observable.combineLatest(
            this.energy.getTimedPowerSeries(energyIPs[0], this.alias),
            this.energy.getTimedPowerSeries(energyIPs[1], this.alias),
            (d1, d2) => {
               // this.kpiTotal = d1[0][d1[0].length-1].value + d2[0][d2[0].length-1].value;
                return [d1[0], d2[0]];
            }
        )
        // .subscribe(data => {
          
        //     this.areaData = ClaymoreService.getPoints(this.alias, data);
        //     this.kpiMin = Math.min(...data[0].concat(data[1]));
        //     this.kpiMax = Math.max(...data[0].concat(data[1]));
        //     this.kpiAvg = mean(data[0].concat(data[1]));
        // });
    }

}
