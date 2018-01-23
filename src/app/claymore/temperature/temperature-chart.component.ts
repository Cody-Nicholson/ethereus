import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClaymoreService } from '../claymore.service';
import { Subscription } from 'rxjs/Subscription';
import { Input } from '@angular/core';
import { AreaChartData } from '../../core/chart-api';
import { TempChartConfig } from './area-config';

@Component({
  selector: 'eth-temp-chart',
  templateUrl: './temperature-chart.component.html',
  //styleUrls: ['./temperature-chart.component.less']
})
export class TemperatureChartComponent implements OnInit {

  @Input() data: AreaChartData;

  areaConfig: any;

  constructor() {
  }

  ngOnInit(){
    this.areaConfig = new TempChartConfig();
  }

}
