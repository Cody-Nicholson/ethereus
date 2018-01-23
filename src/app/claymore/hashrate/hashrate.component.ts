import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClaymoreService } from '../claymore.service';
import { Subscription } from 'rxjs/Subscription';
import { HashConfig } from './area-config';

@Component({
  selector: 'eth-hashrate',
  templateUrl: './hashrate.component.html',
  styleUrls: ['./hashrate.component.less']
})
export class HashrateComponent implements OnInit {

  areaData: any;
  areaConfig: any;

  poll: Subscription;

  constructor(public claymore: ClaymoreService) {
    this.areaConfig = new HashConfig();
  }

  ngOnInit() {
    this.poll = this.pollHashrate()
      .subscribe(hashrates => {

        if(!this.areaData){
          this.areaData = hashrates.map(h => [])
        }

        hashrates.forEach((hash, i) => {
          let point: any = {
            x: +(new Date()) - 3600000,
            y: hash/1000
          };

          this.areaData[i].push(point);
          if (this.areaData[i].length > 200) {
            this.areaData[i].shift()
          }
        });
        this.areaData = this.areaData.concat()
      });
  }

  pollHashrate() {
    return Observable.interval(1000)
      .mergeMap(i => {
        return this.claymore.getEthHarshrates()
      })
  }

  ngOnDestroy() {
    this.poll.unsubscribe();
  }

}
