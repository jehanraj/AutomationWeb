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
  applicationList: Observable<Lookup>;
  screenList: any;
  screenMap: any;
  disableSubmit = false;
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
  uploadtestCase() {
    if (!this.disableSubmit) {
      this.disableSubmit = true;
      this.app.postTestCase(this.appName, this.screenName, this.file).subscribe(data => {
        this.toastr.success('', 'Upload Success', {
          timeOut: 3000
        });
        this.disableSubmit = false;
      },
        (error) => {
          console.log(error);
          this.disableSubmit = false;
        });
    }
  }
  handleFileInput(files: FileList) {
    this.file = files.item(0);
  }

  downloadTemplate() {
    this.app.downloadTestCase(this.appName, this.screenName).subscribe((data) => {
      const file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));
    });
  }
}
