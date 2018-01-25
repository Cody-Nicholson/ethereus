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
  }

  ngOnDestroy() {
    this.poll.unsubscribe();
  }

}
