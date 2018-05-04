import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'eth-alias-buttons',
  templateUrl: './alias-buttons.component.html',
  styleUrls: ['./alias-buttons.component.less']
})
export class AliasButtonsComponent implements OnInit {

  @Input() alias: string;

  @Output() aliasChange = new EventEmitter();

  constructor() { }

  setAlias(alias: string){
    this.alias = alias;
    this.aliasChange.emit(alias);
  }

  ngOnInit() {

  }

}
