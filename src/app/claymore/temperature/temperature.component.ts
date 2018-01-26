import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClaymoreService } from '../claymore.service';
import { Subscription } from 'rxjs/Subscription';
import { Input } from '@angular/core';

@Component({
  selector: 'eth-temp',
  templateUrl: './temperature.component.html',
})
export class TemperatureComponent implements OnInit {

  @Input() data;

  areaData: any;
  poll: Subscription;
  kpiMin: number = Infinity;
  kpiMax: number = 0;
  kpiAvg: number;

  constructor(public claymore: ClaymoreService) {
  }

  ngOnInit() {
    this.claymore.getTemperatureSeries()
      .subscribe((data: number[][]) => {
        this.areaData = ClaymoreService.getPoints('1H', data);
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
