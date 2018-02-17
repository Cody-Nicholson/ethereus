import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClaymoreService, ClaymoreData } from '../claymore.service';
import { Subscription } from 'rxjs/Subscription';
import { Input } from '@angular/core';
import { AreaChartData, GraphPoint } from '../../core/chart-api';
import { ChartSeriesComponent } from '../../core/ChartSeriesComponent';
import { RigService } from '../../rigs/rig.service';

@Component({
  selector: 'dual-hash',
  templateUrl: './dual-hash.component.html',
})
export class DualHashComponent extends ChartSeriesComponent implements OnInit {

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
        return this.claymore.getDualTimedSeries(rigs[0].ip, this.alias)
          .map(timedSeries => { return this.mapHashScale(timedSeries) })
      })


  }

  mapHashScale(timedSeries) {
    return timedSeries.map(lines => {
      return lines.map(point => {
        return { value: point.value == null ? null : point.value / 1000, timestamp: point.timestamp }
      })
    })
  }

}
