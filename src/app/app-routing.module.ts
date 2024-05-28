import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ModumGasComponent } from './modum-gas/modum-gas.component';
import { ModumFlowComponent } from './modum-flow/modum-flow.component';
import { PtmsComponent } from './ptms/ptms.component';
import { ChristmastreeComponent } from './christmastree/christmastree.component';
import { ThreeElectricActuatorComponent } from './three-electric-actuator/three-electric-actuator.component';
import { SixElectricActuatorComponent } from './six-electric-actuator/six-electric-actuator.component';
import { AutomatedPressureVentValveComponent } from './automated-pressure-vent-valve/automated-pressure-vent-valve.component';
import { ExploreDataComponent } from './explore-data/explore-data.component';
import { HydraulicActuatorComponent } from './hydraulic-actuator/hydraulic-actuator.component';
import { ModumChemComponent } from './modum-chem/modum-chem.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home',
    },
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    data: {
      title: 'Build-In Notifications',
    },
  },
  {
    path: 'modum-gas',
    component: ModumGasComponent,
    data: {
      title: 'Modum Gas',
    },
  },
  {
    path: 'chrismas-tree',
    component: ChristmastreeComponent,
    data: {
      title: 'Christmas Tree',
    },
  },
  {
    path: 'modum-chem',
    component: ModumChemComponent,
    data: {
      title: 'Modum Chem',
    },
  },
  {
    path: 'modum-flow',
    component: ModumFlowComponent,
    data: {
      title: 'Modum Flow',
    },
  },
  {
    path: 'three-eletric-actuator',
    component: ThreeElectricActuatorComponent,
    data: {
      title: '3"Eletric Actuator',
    },
  },
  {
    path: 'six-eletric-actuator',
    component: SixElectricActuatorComponent,
    data: {
      title: '6"Eletric Actuator',
    },
  },
  {
    path: 'hydralic-actuator',
    component: HydraulicActuatorComponent,
    data: {
      title: '5" Hudraulic Actuator',
    },
  },
  {
    path: 'automated-pressure-vent-valve',
    component: AutomatedPressureVentValveComponent,
    data: {
      title: 'Automated Pressure Vent Valve Component',
    },
  },
  {
    path: 'ptms',
    component: PtmsComponent,
    data: {
      title: 'Pressure Temperature Monitor System',
    },
  },
  {
    path: 'explore-data',
    component: ExploreDataComponent,
    data: {
      title: 'Explore Data',
    },
  },
  {
    path: 'themes',
    component: ThemeSwitcherComponent,
    data: {
      title: 'Theme Switching',
      showHeader: false,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
