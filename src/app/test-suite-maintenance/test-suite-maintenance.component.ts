import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';

@Component({
  selector: 'app-test-suite-maintenance',
  templateUrl: './test-suite-maintenance.component.html',
  styleUrls: ['./test-suite-maintenance.component.css']
})
export class TestSuiteMaintenanceComponent implements OnInit {
  testSuiteFile: File = null;
  appName: string = "test";
  screenName: string = "scr";

  constructor(private app: AppService) { }

  ngOnInit() {
  }

  uploadtestsuite() {
    this.app.postTestSuite(this.appName, this.screenName, this.testSuiteFile).subscribe(data => {
      console.log(data);
    });
  }
  handleFileInput(files: FileList) {
    this.testSuiteFile = files.item(0);
  }

}
