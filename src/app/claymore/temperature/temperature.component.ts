import { Component, OnInit } from '@angular/core';
import { Observable ,  Subscription } from 'rxjs';
import { ClaymoreService } from '../claymore.service';
import { Input } from '@angular/core';
import { ChartSeriesComponent } from '../../core/ChartSeriesComponent';
import { RigService } from '../../rigs/rig.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'eth-temp',
  templateUrl: './temperature.component.html',
})
export class TemperatureComponent extends ChartSeriesComponent implements OnInit {

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
    return this.claymore.getTemperatureTimedSeries(this.route.snapshot.parent.params.ip, this.alias)
  }
}
