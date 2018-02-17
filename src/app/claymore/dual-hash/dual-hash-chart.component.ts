import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClaymoreService } from '../claymore.service';
import { Subscription } from 'rxjs/Subscription';
import { Input } from '@angular/core';
import { AreaChartData } from '../../core/chart-api';
import { DualHashChartConfig } from './chart-config';
import { ClaymoreChartConfig } from '../chart-config';

@Component({
  selector: 'dual-hash-chart',
  templateUrl: './dual-hash-chart.component.html',
  //styleUrls: ['./temperature-chart.component.less']
})
export class DualHashChartComponent implements OnInit {

  @Input() data: AreaChartData;
  @Input() legendLabels: string[];

  areaConfig: any;

  constructor() {
  }

  ngOnInit(){
    this.areaConfig = new DualHashChartConfig();
  }

}
