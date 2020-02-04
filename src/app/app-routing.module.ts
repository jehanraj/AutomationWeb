import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TestSuiteMaintenanceComponent } from './test-suite-maintenance/test-suite-maintenance.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { TestcaseMaintenanceComponent } from './testcase-maintenance/testcase-maintenance.component';

const routes: Routes = [{ path: 'login', component: LoginComponent },
{ path: '', component: HomeComponent },
{ path: 'testsuitemaintenance', component: TestSuiteMaintenanceComponent },
{ path: 'applicationdetails', component: ApplicationDetailsComponent },
{ path: 'testcasemaintenance', component: TestcaseMaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
