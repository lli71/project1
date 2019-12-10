import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material';


import { SlbNavigationFrameworkModule} from '@slb-dls/angular-material/navigation-framework';
import { SlbSharedModule } from '@slb-dls/angular-material/shared';
import { SlbIconModule } from '@slb-dls/angular-material/icon';
import { SlbNotificationModule, MessageService } from '@slb-dls/angular-material/notification';
import { SlbNotificationsPanelModule } from '@slb-dls/angular-material/notifications-panel';
import { SlbLogoutModule } from '@slb-dls/angular-material/logout';
import { SlbPopoverModule } from '@slb-dls/angular-material/popover';
import { SlbButtonModule } from '@slb-dls/angular-material/button';
import { SLB_DATE_FORMATS } from '@slb-dls/angular-material/date-and-time-pickers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { NotificationsComponent } from './notifications/notifications.component';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline',
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ThemeSwitcherComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatSlideToggleModule,

    SlbSharedModule,
    SlbButtonModule,
    SlbPopoverModule,
    SlbIconModule,
    SlbNotificationModule,
    SlbNotificationsPanelModule,
    SlbNavigationFrameworkModule,
    SlbLogoutModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: SLB_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MessageService, useClass: MessageService },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: appearance },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
