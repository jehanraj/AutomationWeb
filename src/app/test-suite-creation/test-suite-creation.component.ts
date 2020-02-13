import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { Observable } from 'rxjs';
import { Lookup, TestScenario } from '../shared/app.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test-suite-creation',
  templateUrl: './test-suite-creation.component.html',
  styleUrls: ['./test-suite-creation.component.css']
})

export class TestSuiteCreationComponent implements OnInit {

  appName: string;
  screenName: string;
  applicationList: Observable<Lookup>;
  screenList: any;
  screenMap: any;
  testScenario: TestScenario;
  testScenarioList: Array<TestScenario> = [];

  constructor(private app: AppService, private toastr: ToastrService) { }

  ngOnInit() {
    this.applicationList = this.app.getApplications();
    this.app.getScreens().subscribe(data => {
      this.screenMap = data;
    });
    this.loadTestCaseSuiteMapping();
  }

  updateScreensList() {
    this.screenName = '';
    this.screenList = this.screenMap[this.appName];
  }

  addRow(index) {
    this.testScenario = {};
    this.testScenarioList.push(this.testScenario);
    this.toastr.success('New row added successfully', 'New Row');
    return true;
  }

  deleteRow(index) {
    if (this.testScenarioList.length === 1) {
      this.toastr.error('Can\'t delete the row when there is only one row', 'Warning');
      return false;
    } else {
      this.testScenarioList.splice(index, 1);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }

  loadTestCaseSuiteMapping() {
    this.testScenario = {};
    this.testScenarioList.push(this.testScenario);
  }

  createTestsuite() {
  }

}
