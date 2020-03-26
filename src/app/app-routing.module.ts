import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestSuiteMaintenanceComponent } from './test-suite-maintenance/test-suite-maintenance.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { TestSuiteCreationComponent } from './test-suite-creation/test-suite-creation.component';
import { TestedReportsComponent } from './tested-reports/tested-reports.component';
import { TestcaseMaintenanceComponent } from './testcase-maintenance/testcase-maintenance.component';
import { AuthenticationGuard } from './shared/authentication.guard';
import {TestdataFromdbMaintenanceComponent} from './testdata-fromdb-maintenance/testdata-fromdb-maintenance.component';

const routes: Routes = [{ path: 'login', component: LoginComponent },
{ path: '', component: HomeComponent, canActivate: [AuthenticationGuard] },
{ path: 'testsuite/maintenance', component: TestSuiteMaintenanceComponent },
{ path: 'testcasemaintenance', component: TestcaseMaintenanceComponent, canActivate: [AuthenticationGuard] },
{ path: 'applicationdetails', component: ApplicationDetailsComponent, canActivate: [AuthenticationGuard] },
{ path: 'loadTestReportDetails', component: TestedReportsComponent, canActivate: [AuthenticationGuard] },
{ path: 'loadTestDataFromDBDetails', component: TestdataFromdbMaintenanceComponent, canActivate: [AuthenticationGuard] },
{ path: 'testsuite/create', component: TestSuiteCreationComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
