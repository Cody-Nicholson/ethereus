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
    path: 'eth-hashrate',
    component: EthHashComponent
  },
  {
    path: 'dual-hashrate',
    component: DualHashComponent
  },
  {
    path: 'temperatures',
    component: TemperatureComponent
  },
  {
    path: 'fans',
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