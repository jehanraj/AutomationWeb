import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { Observable } from 'rxjs';
import { Lookup } from '../shared/app.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test-suite-maintenance',
  templateUrl: './test-suite-maintenance.component.html',
  styleUrls: ['./test-suite-maintenance.component.css']
})
export class TestSuiteMaintenanceComponent implements OnInit {
  testSuiteFile: File = null;
  appName: string;
  screenName: string;
  applicationList: Observable<Lookup>;
  screenList: Observable<Lookup>;

  constructor(private app: AppService, private toastr: ToastrService) { }

  ngOnInit() {
    this.applicationList = this.app.getApplications();
    this.screenList = this.app.getScreens();

  }

  uploadtestsuite() {
    this.app.postTestSuite(this.appName, this.screenName, this.testSuiteFile).subscribe(data => {
      console.log(data);
      this.toastr.success('', 'Upload Success', {
        timeOut: 3000
      });
    });
  }
  handleFileInput(files: FileList) {
    this.testSuiteFile = files.item(0);
  }

  downloadTemplate() {
    this.app.downloadTemplate().subscribe((data) => {
      const file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }
}
