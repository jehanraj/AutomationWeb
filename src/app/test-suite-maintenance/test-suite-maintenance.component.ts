import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { Observable } from 'rxjs';
import { Lookup } from '../shared/app.model';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-test-suite-maintenance',
  templateUrl: './test-suite-maintenance.component.html',
  styleUrls: ['./test-suite-maintenance.component.css']
})
export class TestSuiteMaintenanceComponent implements OnInit {
  testSuiteFile: File = null;
  appName = '';
  screenName = '';
  applicationList: Observable<Array<Lookup>>;
  screenList: any;
  screenMap: any;
  fileName: string;
  submitEnable = true;
  url;
  uploadedFileName: string;

  constructor(private app: AppService, private toastr: ToastrService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.applicationList = this.app.getApplications();
    this.app.getScreens().subscribe(data => {
      this.screenMap = data;
    });
  }

  updateScreensList() {
    this.screenName = '';
    this.screenList = this.screenMap[this.appName];
  }
  uploadtestsuite() {
    if (this.submitEnable) {
      this.submitEnable = false;
      this.uploadedFileName = '';
      this.app.postTestSuite(this.appName, this.screenName, this.testSuiteFile).subscribe(data => {
        this.toastr.success('', 'Upload Success', {
          timeOut: 3000
        });
        this.submitEnable = true;
      }, (error) => {
        this.submitEnable = true;
      });
    }
  }
  handleFileInput(files: FileList) {
    this.testSuiteFile = files.item(0);
    this.uploadedFileName = files.item(0).name;
  }

  downloadTestFile() {
    this.app.downloadTestSuite(this.appName, this.screenName).subscribe((data) => {
      const file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));
      this.fileName = 'TestSuite_' + this.appName + '_' + this.screenName + '.xlsx';
    }, (error) => {
      console.log('File not found');
      this.fileName = '';
    });
  }
}
