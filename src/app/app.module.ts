import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppService } from './shared/app.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { TestSuiteMaintenanceComponent } from './test-suite-maintenance/test-suite-maintenance.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { ToastrModule } from 'ngx-toastr';
import { TestedReportsComponent } from './tested-reports/tested-reports.component';
import { TestcaseMaintenanceComponent } from './testcase-maintenance/testcase-maintenance.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TestSuiteCreationComponent } from './test-suite-creation/test-suite-creation.component';

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
    TestSuiteCreationComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
