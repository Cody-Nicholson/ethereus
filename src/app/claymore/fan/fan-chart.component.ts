import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClaymoreService } from '../claymore.service';
import { Subscription } from 'rxjs/Subscription';
import { Input } from '@angular/core';
import { AreaChartData } from '../../core/chart-api';
import { FanChartConfig } from '../chart-config';

@Component({
  selector: 'eth-fan-chart',
  templateUrl: './fan-chart.component.html',
})
export class FanChartComponent implements OnInit {

  legendLabels: string[] = [
    'Gigabyte Aoris 4G',
    'MSI Armor 4GB',
    'Asus Dual OC 4G',
    'PowerColor Red Dragon 8GB',
    'XFX XXX OC 4GB',
    'PowerColor Red Dragon 4GB'
  ];


  @Input() data: AreaChartData;

  areaConfig: any;

  constructor() {
  }

  ngOnInit(){
    this.areaConfig = new FanChartConfig();
  }

}
