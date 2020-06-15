import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { Lookup } from '../shared/app.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-testdata-fromdb-maintenance',
  templateUrl: './testdata-fromdb-maintenance.component.html',
  styleUrls: ['./testdata-fromdb-maintenance.component.css']
})
export class TestdataFromdbMaintenanceComponent implements OnInit {

  applicationsList: Lookup[];
  screensList: Lookup[];
  screenQueryAuto: '';
  url;
  dropdownSettings: IDropdownSettings;
  screenID_App = '';
  application_id = '';
  screenQuery = '';
  submitEnable = true;
  
  constructor(private app: AppService, private toastr: ToastrService, private http: HttpClient, private sanitizer: DomSanitizer,private alerts: AlertsService) { }
  

  ngOnInit() {
    this.loadData();

    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 2,
      noDataAvailablePlaceholderText: 'No Data Available'
    };
  }

  loadData() {
    this.http.get(environment.baseurl + 'loadTestDataFromDBDetails/'+sessionStorage.auth_user).subscribe(data => {
      this.applicationsList = data['testAppsList'];
      this.screensList = data['testScreensList'];
    });
  }

  onChangeLoadScreen(value: string) {
    this.http.get(environment.baseurl + 'loadScreensForApps/' + value +'/'+sessionStorage.auth_user).subscribe(data => {
      this.applicationsList = data['testAppsList'];
      this.screensList = data['testScreensList'];
      this.screenQueryAuto = data['screenQuery'];
      this.screenID_App = data['screenID_App'];
    });
  }

  onChangeLoadScreenQuery(value: string) {
    this.http.get(environment.baseurl + 'getScreenQuery/' + value).subscribe(data => {
      this.screenQueryAuto = data['screenQuery'];
    });
  }

  updateScreenQuery() {
    if (this.submitEnable) {
      this.submitEnable = false;
      // if(this.screenQuery.length > 0) {
        console.log("Dropdown selection:", this.screenID_App);
        this.app.updateScreenQuery(this.screenID_App, this.screenQuery).subscribe(data => {
          this.toastr.success('Query Updated');
          // this.toastr.success('Query Updated', '', {
          //   timeOut: 3000
          // });
        }, (error) => {
          this.toastr.error('Error during Query Update', 'Error', {
            timeOut: 3000
          });
        });
        this.submitEnable = true;
      // } else {
      //   this.alerts.setMessage('Empty Query to Update','error');
      //   this.alerts.setDefaults('timeout',0);
      // }
    }
  }
}
