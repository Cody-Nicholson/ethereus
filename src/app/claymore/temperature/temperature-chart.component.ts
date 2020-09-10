import { Component, OnInit } from '@angular/core';
import { Observable ,  Subscription } from 'rxjs';
import { ClaymoreService } from '../claymore.service';
import { Input } from '@angular/core';
import { AreaChartData } from '../../core/chart-api';
import { TempChartConfig } from '../chart-config';

@Component({
  selector: 'eth-temp-chart',
  templateUrl: './temperature-chart.component.html',
})
export class TemperatureChartComponent implements OnInit {

  @Input() data: AreaChartData;
  @Input() legendLabels: string[];

  areaConfig: any;

  constructor() {
  }

  ngOnInit(){
    this.areaConfig = new TempChartConfig();
  }

}
