import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClaymoreService } from '../claymore.service';
import { Subscription } from 'rxjs/Subscription';
import { Input } from '@angular/core';
import { ChartSeriesComponent } from '../../core/ChartSeriesComponent';

@Component({
  selector: 'eth-temp',
  templateUrl: './temperature.component.html',
})
export class TemperatureComponent extends ChartSeriesComponent implements OnInit {

  @Input() data;


  constructor(public claymore: ClaymoreService) {
    super();
  }

  query() {
    return this.claymore.getTemperatureTimedSeries('z', this.alias)
  }
 

}
