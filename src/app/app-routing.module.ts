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
import { TestdataFromdbMaintenanceComponent} from './testdata-fromdb-maintenance/testdata-fromdb-maintenance.component';
import { UserappMappingMaintenanceComponent } from './userapp-mapping-maintenance/userapp-mapping-maintenance.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{ path: 'login', component: LoginComponent },
{ path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
{ path: 'testsuite/maintenance', component: TestSuiteMaintenanceComponent },
{ path: 'testcasemaintenance', component: TestcaseMaintenanceComponent, canActivate: [AuthenticationGuard] },
{ path: 'applicationdetails', component: ApplicationDetailsComponent, canActivate: [AuthenticationGuard] },
{ path: 'testedreports/reports', component: TestedReportsComponent, canActivate: [AuthenticationGuard] },
{ path: 'testdatafromdb/maintenance', component: TestdataFromdbMaintenanceComponent, canActivate: [AuthenticationGuard] },
{ path: 'testsuite/create', component: TestSuiteCreationComponent},
{ path: 'userappmapping/maintenance', component: UserappMappingMaintenanceComponent, canActivate: [AuthenticationGuard] },
{ path: '', component: DashboardComponent, canActivate: [AuthenticationGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
