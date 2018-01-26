import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EnergyChartComponent } from './energy-chart/energy-chart.component';
import { CommonModule } from '@angular/common';
import { EnergyService } from './energy-chart/energy-chart.service';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from './core/header/header.component';
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { HashrateComponent } from './claymore/hashrate/hashrate.component';
import { ClaymoreService } from './claymore/claymore.service';
import { TemperatureComponent } from './claymore/temperature/temperature.component';
import { TemperatureChartComponent } from './claymore/temperature/temperature-chart.component';
import { TempAxisDirective } from './claymore/temperature/temp-axis.directive';
import { KpiCellModule } from "./core/kpi/kpi-cell.module";
import { EthHashComponent } from './claymore/eth-hash/eth-hash.component';
import { EthHashChartComponent } from './claymore/eth-hash/eth-hash-chart.component';
import { KpiStatComponent } from './kpi-stat/kpi-stat.component';
import { FanComponent } from './claymore/fan/fan.component';
import { FanChartComponent } from './claymore/fan/fan-chart.component';
import { AreaGraphModule } from './area/area-graph.module';
import { EnergyComponent } from './energy-chart/energy.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AreaGraphModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    KpiCellModule
  ],
  declarations: [
    AppComponent,
    EnergyComponent,
    EnergyChartComponent,
    HeaderComponent,
    HashrateComponent,
    TemperatureChartComponent,
    TemperatureComponent,
    TempAxisDirective,
    FanComponent,
    FanChartComponent,
    EthHashComponent,
    EthHashChartComponent,
    KpiStatComponent,
  ],
  providers: [
    EnergyService,
    ClaymoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
