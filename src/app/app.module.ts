import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { TestSuiteCreationComponent } from './test-suite-creation/test-suite-creation.component';
import { TestcaseMaintenanceComponent } from './testcase-maintenance/testcase-maintenance.component';
import { TestSuiteMaintenanceComponent } from './test-suite-maintenance/test-suite-maintenance.component';
import { AppService } from './shared/app.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { TestedReportsComponent } from './tested-reports/tested-reports.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TestdataFromdbMaintenanceComponent } from './testdata-fromdb-maintenance/testdata-fromdb-maintenance.component';
import { AlertsModule } from 'angular-alert-module';
import { UserappMappingMaintenanceComponent } from './userapp-mapping-maintenance/userapp-mapping-maintenance.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    HeaderComponent,
    TestSuiteMaintenanceComponent,
    ApplicationDetailsComponent,
    TestedReportsComponent,
    TestcaseMaintenanceComponent,
    TestdataFromdbMaintenanceComponent,
    TestSuiteCreationComponent,
    UserappMappingMaintenanceComponent
  ],
  imports: [
    AppRoutingModule,
    AgGridModule.withComponents([]),
    AngularFontAwesomeModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
    AlertsModule.forRoot()
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
