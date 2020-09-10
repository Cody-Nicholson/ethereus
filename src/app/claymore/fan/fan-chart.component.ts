import { Component, OnInit } from '@angular/core';
import { Observable ,  Subscription } from 'rxjs';
import { ClaymoreService } from '../claymore.service';
import { Input } from '@angular/core';
import { AreaChartData } from '../../core/chart-api';
import { FanChartConfig } from '../chart-config';

@Component({
  selector: 'eth-fan-chart',
  templateUrl: './fan-chart.component.html',
})
export class FanChartComponent implements OnInit {

  @Input() data: AreaChartData;
  @Input() legendLabels: string[];

  areaConfig: any;

  constructor() {
  }

  ngOnInit(){
    this.areaConfig = new FanChartConfig();
  }

}
