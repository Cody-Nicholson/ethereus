import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClaymoreService, ClaymoreData } from '../claymore.service';
import { Subscription } from 'rxjs/Subscription';
import { Input } from '@angular/core';
import { AreaChartData, GraphPoint } from '../../core/chart-api';
import { ChartSeriesComponent } from '../../core/ChartSeriesComponent';

@Component({
  selector: 'eth-fan',
  templateUrl: './fan.component.html',
})
export class FanComponent extends ChartSeriesComponent implements OnInit {

  constructor(public claymore: ClaymoreService) {
    super();
  }

  query() {
    return this.claymore.getFanTimedSeries('z', this.alias)
  }

}
