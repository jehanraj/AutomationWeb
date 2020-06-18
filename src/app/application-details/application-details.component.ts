import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../shared/app.service';
import { Lookup, Application } from '../shared/app.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit {

  applicationsList: Observable<Array<Lookup>>;
  private appId = 'Select';
  screenNamesFile: File = null;
  appName = '';
  appBrowser = 'Select';
  message = '';
  fileName: string;
  url;
  screenUrl;
  appDB = 'Select';
  applicationName = "new"

  columnDefs = [
    { headerName: 'Screen Name', field: 'screenName', default: 'No Data Found' }
  ];

  rowData: Observable<Application>;
  appURL: string;
  dataBaseURL: string;
  dataBaseUserName: string;
  dataBasePassword: string;
  
  constructor(private app: AppService, private http: HttpClient, private toastr: ToastrService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadApplications();
    this.downloadTemplate();
  }

  loadApplications() {
    this.applicationsList = this.app.getApplications();
  }

  search() {
    this.rowData = this.http.get<Application>(environment.baseurl + 'applicationDetails/' + this.appId);
    this.rowData.subscribe(data => {
      this.appURL = data[0].applicationURL;
      this.appName = data[0].applicationName;
      this.appBrowser = data[0].applicationBrowser;
      this.appDB = data[0].applicationDataBase;
      this.applicationName = "existing"
      this.dataBaseURL = data[0].dataBaseURL;
      this.dataBaseUserName = data[0].dataBaseUserName;
      this.dataBasePassword = data[0].dataBasePassword;
    });
    this.download();
  }

  updateApplicationDetails() {
    if(this.applicationName == 'new' && this.screenNamesFile == null) {
      this.toastr.error('Screen details are mandatory for new application');
    } else if (this.appDB != "Select" && (this.dataBaseURL == '' || this.dataBaseUserName == ''
            || this.dataBasePassword == '')) {
              this.toastr.error('Database URL, Username, Password mandatory for the selected Database');       
    } else {
      this.app.postApplicationDetails(this.appName, this.appURL, this.appBrowser,
         this.screenNamesFile, this.appDB, this.dataBaseURL, this.dataBaseUserName, 
         this.dataBasePassword ).subscribe(data => {
        console.log(data);
        this.toastr.success('', 'Upload Success', {
          timeOut: 3000
        });
        this.search();
      });
   }
  }
  handleFileInput(files: FileList) {
    this.screenNamesFile = files.item(0);
  }

  download() {
    this.http.get(environment.baseurl + 'downloadExcel/' + this.appId, { responseType: 'blob' }).subscribe(data => {
      const file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });
      // const fileURL = URL.createObjectURL(file);
      // window.open(fileURL);
      this.screenUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));
    });
  }

  downloadTemplate() {
    this.http.get(environment.baseurl + 'downloadTemplate/', { responseType: 'blob' }).subscribe(data => {
      const file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));
      this.fileName = 'ApplicationScreenDetails.xlsx';
    });
  }

  reloadPage() {
    window.location.reload();
 }
}
