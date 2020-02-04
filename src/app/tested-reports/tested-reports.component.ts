import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { Observable } from 'rxjs';
import { Lookup } from '../shared/app.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TestResultsReports } from '../shared/app.model';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-tested-reports',
  templateUrl: './tested-reports.component.html',
  styleUrls: ['./tested-reports.component.css']
  
})
export class TestedReportsComponent implements OnInit {

  private apps: string[];
  private sr: string[];
  private testuserList: string[];
  private defaultColDef;
  applicationsList: Lookup[];
  screensList: Lookup[];
  public selectedMoment = new Date();
  rowData :Observable<any>;
  report: TestResultsReports = {};

  constructor(private app: AppService,private http: HttpClient) { 
    this.defaultColDef = { resizable: true,sortable: true , filter: true};
    // let params: TestResultsReports = {};
    // params.set('appid', 'id123');
    // params.set('cnt', '42');
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.app.getTestedReports().subscribe(data => {
      this.applicationsList = data['testAppsList'];
      this.screensList = data['testScreensList'];
      this.testuserList = data['testUsersList'];
    });
  }

   searchReport() {
     console.log('test search');
     this.rowData =  this.http.post(environment.baseurl + 'loadTestReports', this.report);
  }
  
  columnDefs = [
    {headerName: 'Application', field: 'testRAppName'},
    {headerName: 'Screen', field: 'testRScreenName'},
    {headerName: 'TestCase', field: 'testedCaseName'},
    {headerName: 'Tested From', field: 'testFromDate'},
    {headerName: 'Tested To', field: 'testToDate'},
    {headerName: 'TestedBy', field: 'testedBy'},
    {headerName: 'Test Input', field: 'testInputs'},
    {headerName: 'Test Output', field: 'testOutput'},
 ];
 download1() {
    this.http.get(environment.baseurl + 'downloadTestReportExcel', {responseType : 'blob'});
 }
  
 download(){
    this.http.post(environment.baseurl + 'downloadTestReportExcel', this.report, {responseType : 'blob'}).subscribe(data => {
     const file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });
     const fileURL = URL.createObjectURL(file);
     window.open(fileURL);   
  });
}
  
}
