import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnergyChartComponent } from './energy-chart/energy-chart.component';
import { HashrateComponent } from './claymore/hashrate/hashrate.component';
import { TemperatureComponent } from './claymore/temperature/temperature.component';
import { FanComponent } from './claymore/temperature/fan.component';


const appRoutes: Routes = [
  {
    path: 'energy',
    component: EnergyChartComponent
  },
  {
    path: 'hashrate',
    component: HashrateComponent
  },
  {
    path: 'temperatures',
    component: TemperatureComponent
  },
  {
    path: 'fans',
    component: FanComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }