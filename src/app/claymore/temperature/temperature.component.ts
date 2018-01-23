import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClaymoreService } from '../claymore.service';
import { Subscription } from 'rxjs/Subscription';
import { Input } from '@angular/core';

@Component({
  selector: 'eth-temp',
  templateUrl: './temperature.component.html',
  //styleUrls: ['./temperature.component.less']
})
export class TemperatureComponent implements OnInit {

  @Input() data;

  areaData: any;
  areaConfig: any;
  poll: Subscription;

  constructor(public claymore: ClaymoreService) {
  }

  ngOnInit() {
    this.poll = this.pollTemperatures()
      .subscribe(temps => {

        if(!this.areaData){
          this.areaData = temps.map(h => [])
        }

        temps.forEach((temp, i) => {
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
      });
  }

  pollTemperatures() {
    return Observable.interval(1000)
      .mergeMap(i => {
        return this.claymore.getTemperatures()
      })
  }

  ngOnDestroy() {
    this.poll.unsubscribe();
  }


}
