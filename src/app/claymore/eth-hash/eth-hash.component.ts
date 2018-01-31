import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClaymoreService, ClaymoreData } from '../claymore.service';
import { Subscription } from 'rxjs/Subscription';
import { Input } from '@angular/core';
import { AreaChartData, GraphPoint } from '../../core/chart-api';
import { ChartSeriesComponent } from '../../core/ChartSeriesComponent';

@Component({
  selector: 'eth-hash',
  templateUrl: './eth-hash.component.html',
})
export class EthHashComponent extends ChartSeriesComponent implements OnInit {

  constructor(public claymore: ClaymoreService) {
    super();
  }

  query() {
    return this.claymore.getEthTimedSeries('z', this.alias)
      .map(timedSeries => {
        return timedSeries.map(lines => {
          return lines.map(point => {
            return { value: point.value == null ? null : point.value / 1000, timestamp: point.timestamp }
          })
        })
      })
  }
}
