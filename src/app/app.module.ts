import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AreaGraphModule } from './area/index';
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
import { FanComponent } from './claymore/temperature/fan.component';
import { FanChartComponent } from './claymore/temperature/fan-chart.component';
import { KpiCellModule } from "./core/kpi/kpi-cell.module";

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
    EnergyChartComponent,
    HeaderComponent,
    HashrateComponent,
    TemperatureChartComponent,
    TemperatureComponent,
    TempAxisDirective,
    FanComponent,
    FanChartComponent
  ],
  providers: [
    EnergyService,
    ClaymoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
