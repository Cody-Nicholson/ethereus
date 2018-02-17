import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClaymoreService } from '../claymore.service';
import { Subscription } from 'rxjs/Subscription';
import { Input } from '@angular/core';
import { ChartSeriesComponent } from '../../core/ChartSeriesComponent';
import { RigService } from '../../rigs/rig.service';

@Component({
  selector: 'eth-temp',
  templateUrl: './temperature.component.html',
})
export class TemperatureComponent extends ChartSeriesComponent implements OnInit {

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
        return this.claymore.getTemperatureTimedSeries(rigs[0].ip, this.alias)
      });
  }

}
