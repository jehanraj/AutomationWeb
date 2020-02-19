import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { Observable } from 'rxjs';
import { Lookup, TestScenario, ComponentMapping } from '../shared/app.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-test-suite-creation',
  templateUrl: './test-suite-creation.component.html',
  styleUrls: ['./test-suite-creation.component.css']
})

export class TestSuiteCreationComponent implements OnInit {

  application: number;
  testcomponent: number;
  applicationList: Array<Lookup>;
  testComponentList: Lookup;
  screenList: Array<String>;
  screenMap: any;
  testScenario: TestScenario;
  testScenarioList: Array<TestScenario> = [];
  clonedScenarioList: Array<TestScenario> = [];
  newTestComponent: any = {};
  disableSave = false;

  constructor(private app: AppService, private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    this.app.getApplications().subscribe(data => {
      this.applicationList = data;
    });
    this.app.getScreens().subscribe(data => {
      this.screenMap = data;
    });
  }

  addRow() {
    this.testScenario = { isEdit: true };
    this.testScenarioList.push(this.testScenario);
    return true;
  }

  deleteRow(index) {
    this.testScenarioList.splice(index, 1);
    this.toastr.warning('Row deleted successfully', 'Delete row');
    return true;
  }

  saveRow(rowIndex: number) {
    this.testScenarioList[rowIndex].isEdit = false;
  }

  createTestsuite() {
    if (!this.disableSave) {
      this.disableSave = true;
      const data: ComponentMapping = {
        componentId: this.testcomponent,
        componentMapping: this.testScenarioList
      };
      this.app.saveComponentMapping(data).subscribe(result => {
        this.toastr.success('Saved Successfully');
        this.disableSave = false;
      }, (error) => {
        console.log('error');
        this.disableSave = false;
      });
    }
  }

  open(content) {
    this.modalService.open(content);
  }
  saveComponent() {
    this.app.saveTestComponent(this.newTestComponent).subscribe(data => {
      this.toastr.success('Test Component saved successfully', '');
      this.newTestComponent = {};
    }, (error) => {
      console.log(error);
    });
    this.modalService.dismissAll();
  }
  editRow(index: number) {
    this.testScenarioList[index].isEdit = true;
    const data = this.testScenarioList[index];
    this.clonedScenarioList[index] = { ...data };
  }
  cancel(index: number) {
    if (this.clonedScenarioList[index]) {
      this.testScenarioList[index] = this.clonedScenarioList[index];
      this.testScenarioList[index].isEdit = false;
      delete this.clonedScenarioList[index];
    } else {
      this.testScenarioList.splice(index, 1);
    }
  }

  updateDropdowns() {
    const app = this.applicationList.find(o => o.id == this.application);
    this.screenList = this.screenMap[app.name];
    this.app.getTestComponents(this.application).subscribe(data => {
      this.testComponentList = data;
    });
  }

  searchMapping() {
    this.app.getComponentMapping(this.testcomponent).subscribe(data => {
      this.testScenarioList = data;
    });
  }
}
