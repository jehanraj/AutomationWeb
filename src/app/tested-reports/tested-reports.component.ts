import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { Observable } from 'rxjs';
import { Lookup } from '../shared/app.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TestResultsReports } from '../shared/app.model';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-tested-reports',
  templateUrl: './tested-reports.component.html',
  styleUrls: ['./tested-reports.component.css']
  
})
export class TestedReportsComponent implements OnInit {
  
  private testuserList: string[];
  private defaultColDef;
  applicationsList: Lookup[];
  screensList: Lookup[];
  public selectedMoment = new Date();
  rowData :Observable<any>;
  report: TestResultsReports = {};
  fileName: string;
  url;
  dropdownSettings:IDropdownSettings;
  dropdownSettings_Screen:IDropdownSettings;
  

  constructor(private app: AppService,private http: HttpClient,private sanitizer: DomSanitizer) { 
    this.defaultColDef = { resizable: true,sortable: true , filter: true};
    
  }

  ngOnInit() {
    this.loadData();
    this.download();
    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 2,
      noDataAvailablePlaceholderText :'No Data Available'
    };
    this.dropdownSettings_Screen = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 2,
      noDataAvailablePlaceholderText :'No Data Available'
    };
  }

  loadData() {
    this.app.getTestedReports().subscribe(data => {
      this.applicationsList = data['testAppsList'];
      this.screensList = data['testScreensList'];
      this.testuserList = data['testUsersList'];
    });
  }

  onChangeLoadScreen(value:string) {
       this.http.get(environment.baseurl + 'loadTestReportDetails/'+ value).subscribe(data => {
       this.applicationsList = data['testAppsList'];
       this.screensList = data['testScreensList'];
       this.testuserList = data['testUsersList'];
     });
  }
  
   searchReport() {
     this.rowData =  this.http.post(environment.baseurl + 'loadTestReports', this.report);
     this.download();
  }
  
  columnDefs = [
    {headerName: 'Application', field: 'testRAppName'},
    {headerName: 'Screen', field: 'testRScreenName'},
    {headerName: 'TestCase', field: 'testedCaseName'},
    {headerName: 'Tested From', field: 'testStartDate',cellRenderer: (data) => {
      return moment(data.value).format('DD-MM-YYYY HH:mm:ss') }},
    {headerName: 'Tested To', field: 'testEndDate', cellRenderer: (data) => {
      return moment(data.value).format('DD-MM-YYYY HH:mm:ss') }},
    {headerName: 'TestedBy', field: 'testedBy'},
    {headerName: 'Test Input', field: 'testInputs'},
    {headerName: 'Test Output', field: 'testOutput'},
 ];

 download(){
    this.http.post(environment.baseurl + 'downloadTestReportExcel', this.report, {responseType : 'blob'}).subscribe(data => {
     const file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });
     //const fileURL = URL.createObjectURL(file);
     //window.open(fileURL);   
     this.url = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));
     this.fileName = 'Test Results_Report.xlsx';
  });
}

onItemSelect(item: any) {
  console.log("onItemSelect:"+item);
}
onSelectAll(items: any) {
  console.log("onSelectAll:"+items);
}

}
