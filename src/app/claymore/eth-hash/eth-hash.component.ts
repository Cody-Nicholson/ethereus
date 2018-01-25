import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClaymoreService, ClaymoreData } from '../claymore.service';
import { Subscription } from 'rxjs/Subscription';
import { Input } from '@angular/core';
import { AreaChartData, GraphPoint } from '../../core/chart-api';

@Component({
  selector: 'eth-hash',
  templateUrl: './eth-hash.component.html',
})
export class EthHashComponent implements OnInit {

  @Input() data;

  areaData: any;
  poll: Subscription;
  kpiMin: number = Infinity;
  kpiMax: number = 0;
  kpiAvg: number;

  constructor(public claymore: ClaymoreService) {
  }

  ngOnInit() {
    this.claymore.getEthereumHashrateSeries()
      .subscribe((data: number[][]) => {
        this.areaData = ClaymoreService.getHashPoints('10M', data);
        this.kpiMin = ClaymoreService.getMin(data);
        this.kpiMax = ClaymoreService.getMax(data);
        this.kpiAvg = ClaymoreService.getAverage(data);
      })
  }

  pollFans() {
    return Observable.interval(5000)
      .mergeMap(i => {
        return this.claymore.getTemperatureSeries()
      })
  }

  ngOnDestroy() {
    //this.poll.unsubscribe();
  }
}
