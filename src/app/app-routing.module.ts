import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnergyChartComponent } from './energy-chart/energy-chart.component';
import { TemperatureComponent } from './claymore/temperature/temperature.component';
import { EthHashComponent } from './claymore/eth-hash/eth-hash.component';
import { FanComponent } from './claymore/fan/fan.component';
import { EnergyComponent } from './energy-chart/energy.component';
import { RigsComponent } from './rigs/rigs.component';
import { DualHashComponent } from './claymore/dual-hash/dual-hash.component';


const appRoutes: Routes = [
  {
    path: 'energy',
    component: EnergyComponent,
  },
  {
    path: 'rigs/:ip/eth-hashrate',
    component: EthHashComponent
  },
  {
    path: 'rigs/:ip/dual-hashrate',
    component: DualHashComponent
  },
  {
    path: 'rigs/:ip/temperatures',
    component: TemperatureComponent
  },
  {
    path: 'rigs/:ip/fans',
    component: FanComponent
  },
  {
    path: 'rigs',
    component: RigsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
     // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }