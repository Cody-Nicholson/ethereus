import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Input } from '@angular/core';
import { EnergyService } from './energy-chart.service';
import { ClaymoreService } from '../claymore/claymore.service';
import { mean } from 'lodash';

@Component({
    selector: 'energy-component',
    templateUrl: './energy.component.html',
})
export class EnergyComponent implements OnInit {

    @Input() data;

    areaData: any;
    kpiMin: number = Infinity;
    kpiMax: number = 0;
    kpiAvg: number;

    constructor(public energy: EnergyService) {
    }

    ngOnInit() {
        this.energy.getPowerSeries()
            .subscribe(data => {
                this.areaData = ClaymoreService.getPoints('10M', [data]);
                this.kpiMin = Math.min(...data);
                this.kpiMax = Math.max(...data);
                this.kpiAvg = mean(data);
            });
    }

}
