import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { Observable } from 'rxjs';
import { Lookup } from '../shared/app.model';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-testcase-maintenance',
  templateUrl: './testcase-maintenance.component.html',
  styleUrls: ['./testcase-maintenance.component.css']
})
export class TestcaseMaintenanceComponent implements OnInit {

  file: File = null;
  appName: string;
  screenName: string;
  applicationList: Observable<Array<Lookup>>;
  screenList: any;
  screenMap: any;
  fileName: string;
  submitEnable = true;
  uploadedFileName: string;
  url;

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
      this.app.postTestCase(this.appName, this.screenName, this.file).subscribe(data => {
        this.uploadedFileName = '';
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
    this.file = files.item(0);
    this.uploadedFileName = files.item(0).name;
  }

  downloadTestCaseFile() {
    this.app.downloadTestCase(this.appName, this.screenName).subscribe((data) => {
      const file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));
      this.fileName = 'TestCase_' + this.appName + '_' + this.screenName + '.xlsx';
    }, (error) => {
      console.log('File not found');
      this.fileName = '';
    });
  }
}
