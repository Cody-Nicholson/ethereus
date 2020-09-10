import { Component, OnInit } from '@angular/core';
import { ClaymoreService, ClaymoreData } from '../claymore.service';
import { ChartSeriesComponent } from '../../core/ChartSeriesComponent';
import { RigService } from '../../rigs/rig.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'eth-fan',
  templateUrl: './fan.component.html',
})
export class FanComponent extends ChartSeriesComponent implements OnInit {

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
    return this.claymore.getFanTimedSeries(this.route.snapshot.parent.params.ip, this.alias)
  }

}
