import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { NotificationsComponent } from './notifications/notifications.component';

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
