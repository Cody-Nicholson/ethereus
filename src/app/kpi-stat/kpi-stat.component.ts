import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'kpi-stat',
  templateUrl: './kpi-stat.component.html',
  styleUrls: ['./kpi-stat.component.less']
})
export class KpiStatComponent implements OnInit {

  @Input() value: string;
  @Input() label: string;
  @Input() color: string = 'blue';
  @Input() size: number = 3;

  constructor() { }

  getSizeClass(){
    return `col-xs-${this.size}`;
  }

  ngOnInit() {
  }

}
