import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClaymoreService } from '../claymore.service';
import { Subscription } from 'rxjs/Subscription';
import { Input } from '@angular/core';

@Component({
  selector: 'eth-fan',
  templateUrl: './fan.component.html',
})
export class FanComponent implements OnInit {

  @Input() data;

  areaData: any;
  poll: Subscription;
  minSpeed: number = Infinity;
  maxSpeed: number = 0;
  avg: number[] = []

  constructor(public claymore: ClaymoreService) {
  }

  setMin(fans){
    this.minSpeed = Math.min(this.minSpeed, ...fans)
  }

  setMax(fans){
    this.maxSpeed = Math.max(this.maxSpeed, ...fans)
  }

  setAverage(fans){
    this.avg.push()
    this.maxSpeed = Math.max(this.maxSpeed, ...fans)
  }

  setArea(fans){
    if(!this.areaData){
      this.areaData = fans.map(h => [])
    }

    fans.forEach((temp, i) => {
      let point: any = {
        x: +(new Date()) - 3600000,
        y: temp
      };

      this.areaData[i].push(point);
      if (this.areaData[i].length > 200) {
        this.areaData[i].shift()
      }
    });
    this.areaData = this.areaData.concat()
  }

  ngOnInit() {
    this.poll = this.pollFans()
      .subscribe(fans => {

        this.setMin(fans);
        this.setMax(fans);
        this.setArea(fans);

      });
  }

  pollFans() {
    return Observable.interval(10000)
      .mergeMap(i => {
        return this.claymore.getTemperatures()
      })
  }

  ngOnDestroy() {
    this.poll.unsubscribe();
  }


}
