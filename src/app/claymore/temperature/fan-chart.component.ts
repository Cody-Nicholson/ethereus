import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClaymoreService } from '../claymore.service';
import { Subscription } from 'rxjs/Subscription';
import { Input } from '@angular/core';
import { AreaChartData } from '../../core/chart-api';
import { FanChartConfig } from './area-config';

@Component({
  selector: 'eth-fan-chart',
  templateUrl: './fan-chart.component.html',
  //styleUrls: ['./temperature-chart.component.less']
})
export class FanChartComponent implements OnInit {

  @Input() data: AreaChartData;

  areaConfig: any;

  constructor() {
  }

  ngOnInit(){
    this.areaConfig = new FanChartConfig();
  }

}
