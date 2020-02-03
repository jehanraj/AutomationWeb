import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../shared/app.service';
import { Lookup, Application } from '../shared/app.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit {
  
  applicationsList: Observable<Lookup>;
  private appId: string = 'Select';
  screenNamesFile: File = null;
  appName: string = "";
  appBrowser: string = "";
  message: string = "";

  columnDefs = [
    {headerName: 'Screen Name', field: 'screenName'}
  ];

  rowData : Observable<Application>;
  appURL:string;
  // [
  //   { make: 'Toyota', model: 'Celica', price: 35000 },
  //   { make: 'Ford', model: 'Mondeo', price: 32000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 }
  // ];

  constructor(private app: AppService,private http: HttpClient) {}

  ngOnInit() {
    this.loadApplications();
  }

 loadApplications() {
  this.applicationsList = this.app.getApplications();
 }

 search(){
    this.rowData = this.http.get<Application>(environment.baseurl + 'applicationDetails/' + this.appId);
    this.rowData.subscribe(data=>{
    this.appURL = data[0].applicationURL;
    this.appName = data[0].applicationName;
    this.appBrowser = data[0].applicationBrowser;
    })
  }

  updateApplicationDetails() {
     this.app.postApplicationDetails(this.appName, this.appURL, this.appBrowser, this.screenNamesFile).subscribe(data => {
      console.log(data);
    });
    this.search();
  }
  handleFileInput(files: FileList) {
    this.screenNamesFile = files.item(0);
  }

  download(){
    this.http.get(environment.baseurl + 'downloadExcel/' + this.appId, {responseType : 'blob'}).subscribe(data => {
       const file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });
       const fileURL = URL.createObjectURL(file);
       window.open(fileURL);   
    });
  }

  downloadTemplate(){
    this.http.get(environment.baseurl + 'downloadTemplate/', {responseType : 'blob'}).subscribe(data => {
       const file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });
       const fileURL = URL.createObjectURL(file);
       window.open(fileURL);   
    });
  }


}