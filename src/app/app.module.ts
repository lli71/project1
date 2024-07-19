import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCheckboxModule, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthInterceptor } from './auth-interceptor.service'; // 确保路径正确
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SlbChartModule } from '@slb-dls/angular-material/chart';
import { SlbEmptyStateModule } from '@slb-dls/angular-material/empty-state';
import { SlbProgressIndicatorModule } from '@slb-dls/angular-material/progress-indicator';
import { SlbPaginationControlModule } from '@slb-dls/angular-material/pagination-control';
import { SlbSearchModule } from '@slb-dls/angular-material/search';
import { SlbNavigationFrameworkModule } from '@slb-dls/angular-material/navigation-framework';
import { SlbSharedModule } from '@slb-dls/angular-material/shared';
import { SlbNotificationModule, MessageService } from '@slb-dls/angular-material/notification';
import { SlbNotificationsPanelModule } from '@slb-dls/angular-material/notifications-panel';
import { SlbLogoutModule } from '@slb-dls/angular-material/logout';
import { SlbPopoverModule } from '@slb-dls/angular-material/popover';
import { SlbButtonModule } from '@slb-dls/angular-material/button';
import { SlbBreadcrumbsModule } from '@slb-dls/angular-material/breadcrumbs';
import { SlbFormFieldModule } from '@slb-dls/angular-material/form-field';
import { SLB_MOMENT_DATE_FORMATS, SLB_THEMING_OPTIONS } from '@slb-dls/angular-material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { themeConfig } from '../themes/theme.config';
import { ModumGasComponent } from './modum-gas/modum-gas.component';
import { ModumChemComponent } from './modum-chem/modum-chem.component';
import { ModumFlowComponent } from './modum-flow/modum-flow.component';
import { ChristmastreeComponent } from './christmastree/christmastree.component';
import { ThreeElectricActuatorComponent } from './three-electric-actuator/three-electric-actuator.component';
import { SixElectricActuatorComponent } from './six-electric-actuator/six-electric-actuator.component';
import { HydraulicActuatorComponent } from './hydraulic-actuator/hydraulic-actuator.component';
import { AutomatedPressureVentValveComponent } from './automated-pressure-vent-valve/automated-pressure-vent-valve.component';
import { PtmsComponent } from './ptms/ptms.component';
import { ExploreDataComponent } from './explore-data/explore-data.component';
import {MatTableModule} from '@angular/material/table';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { SlbPopoverDemoComponent } from './slb-popover-demo/slb-popover-demo.component';
import { DebugComponent } from './debug/debug.component';
import { SlbNumericInputControlModule } from '@slb-dls/angular-material/numeric-input-control';
import { SlbInputMaskModule } from '@slb-dls/angular-material/input-mask';
// import {
//   SlbAutocompleteEditorComponent,
//   SlbColorEditorComponent,
//   SlbDateTimeEditorComponent,
//   SlbDateTimeFilterComponent,
//   SlbDropdownEditorComponent,
//   SlbTimeEditorComponent,
//   SlbCheckboxEditorComponent,
//   SlbRadioButtonsEditorComponent,
//   SlbNoDataComponent
// } from '@slb-dls/angular-material/ag-grid';
const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline',
};

const defaultColor = {
  color: 'primary',
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ThemeSwitcherComponent,
    NotificationsComponent,
    ModumGasComponent,
    ModumChemComponent,
    ModumFlowComponent,
    ChristmastreeComponent,
    ThreeElectricActuatorComponent,
    SixElectricActuatorComponent,
    HydraulicActuatorComponent,
    AutomatedPressureVentValveComponent,
    PtmsComponent,
    ExploreDataComponent,
    ConfirmationDialogComponent,
    SlbPopoverDemoComponent,
    DebugComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatMomentDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSortModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressBarModule,
    SlbSharedModule,
    SlbButtonModule,
    SlbFormFieldModule,
    SlbPopoverModule,
    SlbNotificationModule,
    SlbNotificationsPanelModule,
    SlbNavigationFrameworkModule,
    SlbBreadcrumbsModule,
    SlbLogoutModule,
    SlbSearchModule,
    SlbPaginationControlModule,
    SlbProgressIndicatorModule,
    SlbEmptyStateModule,
    SlbChartModule,
    AgGridModule,
    SlbNumericInputControlModule,
    SlbInputMaskModule
  ],
  providers: [
    { provide: SLB_THEMING_OPTIONS, useValue: themeConfig },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: appearance },
    { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: defaultColor },
    { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: defaultColor },
    { provide: MAT_DATE_FORMATS, useValue: SLB_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MessageService, useClass: MessageService },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }