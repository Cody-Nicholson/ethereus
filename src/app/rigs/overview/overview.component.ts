import { Component, OnInit } from '@angular/core';
import { RigService, Rig } from '../rig.service';
import { ClaymoreService, ClaymoreData } from '../../claymore/claymore.service';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { sum } from 'lodash';

@Component({
  selector: 'rigs-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less']
})
export class RigsOverviewComponent implements OnInit {

  rigs: Rig[];
  rows: RigRow[];

  constructor(protected rigService: RigService,
    protected clayService: ClaymoreService) { }

  ngOnInit() {

    this.rigService.getAll()
      .flatMap(rigs => {
        this.rigs = rigs;
        return forkJoin(rigs.map(rig => {
          return this.clayService.getSnapshot(rig.ip);
        }))
      })
      .subscribe(clayData => {
        this.rows = clayData.map((data, i) => {
          return new RigRow(this.rigs[i], data);
        })
      })
  }

}

export class RigRow implements Rig {
  ip: string;
  name: string;
  claymore: ClaymoreData;
  ethShares: number;
  dcrShares: number;
  ethRejects: number;
  dcrRejects: number;
  ethInvalid: number;
  dcrInvalid: number;
  ethHash: Array<string | number>;
  dcrHash: number[];
  temps: number[];
  fans: number[];
  pools: string;
  ver: string;
  uptime: number;
  totalEthHash: number;

  constructor(rig: Rig, data: ClaymoreData) {
    Object.assign(this, rig);
    Object.assign(this, data);
    this.ethHash = this.ethHash.map(v => {
      return (+v / 1000).toFixed(1);
    })
    this.totalEthHash = sum(this.ethHash);
  }

}
