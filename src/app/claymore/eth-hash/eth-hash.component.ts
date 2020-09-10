import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ClaymoreService, ClaymoreData } from '../claymore.service';
import { Input } from '@angular/core';
import { AreaChartData, GraphPoint } from '../../core/chart-api';
import { ChartSeriesComponent } from '../../core/ChartSeriesComponent';
import { RigService } from '../../rigs/rig.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'eth-hash',
  templateUrl: './eth-hash.component.html',
})
export class EthHashComponent extends ChartSeriesComponent implements OnInit {

  legendLabels: string[] = [];

  constructor(protected claymore: ClaymoreService,
    protected rigService: RigService,
    protected route: ActivatedRoute) {
    super();

    this.rigService.getSelected()
      .subscribe(rig => {
        this.legendLabels = rig.gpus;
      });
  }

  query() {
    console.log(`Query Eth Timed: ${this.route.snapshot.parent.params.ip}: ${this.alias}`)
    return this.claymore.getEthTimedSeries(this.route.snapshot.parent.params.ip, this.alias)
      .pipe(
        map(timedSeries => { return this.mapHashScale(timedSeries) })
      );

  }

  mapHashScale(timedSeries) {
    return timedSeries.map(lines => {
      return lines.map(point => {
        return { value: point.value == null ? null : point.value / 1000, timestamp: point.timestamp }
      })
    })
  }

}
