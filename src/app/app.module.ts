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
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { SynValueListComponent } from './value-list/value-list';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RigsComponent } from './rigs/edit/edit.component';
import { RigService } from './rigs/rig.service';
import { DualHashChartComponent } from './claymore/dual-hash/dual-hash-chart.component';
import { DualHashComponent } from './claymore/dual-hash/dual-hash.component';
import { AliasPipe } from './core/alias.pipe';
import { AliasButtonsComponent } from './core/alias-buttons/alias-buttons.component';
import { RigNavComponent } from './rigs/nav/nav.component';
import { RigsOverviewComponent } from './rigs/overview/overview.component';
import { TableModule } from './tables/table.module';
import { ParallelBarsModule } from './parallel-bars/parallel-bars.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AreaGraphModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    KpiCellModule,
    AsyncLocalStorageModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ParallelBarsModule
  ],
  declarations: [
    AppComponent,
    EnergyComponent,
    EnergyChartComponent,
    HeaderComponent,
    TemperatureChartComponent,
    TemperatureComponent,
    TempAxisDirective,
    FanComponent,
    FanChartComponent,
    EthHashComponent,
    EthHashChartComponent,
    DualHashChartComponent,
    DualHashComponent,
    KpiStatComponent,
    SynValueListComponent,
    RigsComponent,
    AliasPipe,
    AliasButtonsComponent,
    RigNavComponent,
    RigsOverviewComponent,
  ],
  providers: [
    EnergyService,
    ClaymoreService,
    RigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
