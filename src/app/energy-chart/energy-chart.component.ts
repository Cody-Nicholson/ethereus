import { Component } from '@angular/core';
import { AreaDemoConfig } from './area-config';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { EnergyService } from './energy-chart.service';
import { ClaymoreService } from '../claymore/claymore.service';
import { Input } from '@angular/core';
import { AreaChartData } from '../core/chart-api';

@Component({
    selector: 'energy-chart',
    templateUrl: './energy-chart.component.html',
    styleUrls: ['./energy-chart.component.less']
})
export class EnergyChartComponent {

    @Input() data: AreaChartData;

    areaConfig: any;
  
    constructor() {
    }
  
    ngOnInit(){
      this.areaConfig = new AreaDemoConfig();
    }

}