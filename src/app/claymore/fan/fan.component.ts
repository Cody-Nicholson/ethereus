import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClaymoreService, ClaymoreData } from '../claymore.service';
import { Subscription } from 'rxjs/Subscription';
import { AreaChartData, GraphPoint } from '../../core/chart-api';
import { ChartSeriesComponent } from '../../core/ChartSeriesComponent';
import { RigService } from '../../rigs/rig.service';

@Component({
  selector: 'eth-fan',
  templateUrl: './fan.component.html',
})
export class FanComponent extends ChartSeriesComponent implements OnInit {

  legendLabels: string[] = [
    'Gigabyte Aoris 4G',
    'MSI Armor 4GB',
    'Asus Dual OC 4G',
    'PowerColor Red Dragon 8GB',
    'XFX XXX OC 4GB',
    'PowerColor Red Dragon 4GB'
  ];

  constructor(public claymore: ClaymoreService, protected rigService: RigService) {
    super();
  }

  query() {
    return this.rigService.getAll()
    .switchMap((rigs) => {
      return this.claymore.getFanTimedSeries(rigs[0].ip, this.alias)
    })
  }

}
