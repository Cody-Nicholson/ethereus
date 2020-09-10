import { Component, OnInit } from '@angular/core';
import { Observable ,  Subscription } from 'rxjs';
import { ClaymoreService } from '../claymore.service';
import { Input } from '@angular/core';
import { AreaChartData } from '../../core/chart-api';
import { EthHashChartConfig } from './chart-config';

@Component({
  selector: 'eth-hash-chart',
  templateUrl: './eth-hash-chart.component.html',
  //styleUrls: ['./temperature-chart.component.less']
})
export class EthHashChartComponent implements OnInit {

  @Input() data: AreaChartData;
  @Input() legendLabels: string[];

  areaConfig: any;

  constructor() {
  }

  ngOnInit(){
    this.areaConfig = new EthHashChartConfig();
  }

}
