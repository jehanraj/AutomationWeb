import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { Observable } from 'rxjs';
import { Lookup, TestScenario, ComponentMapping } from '../shared/app.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private applicationList: Observable<Array<Lookup>>;
  private screenList: any;
  private screenMap; any;
  appName: string = 'Choose Application';
  screenName: string = 'Choose Screen';
  dataFromDBCheckbox: string;
  testComponentList: Lookup;
  constructor(private app: AppService) { }
  applicationNameList: Array<Lookup>;
  componentID: string = 'Choose Component';

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.applicationList = this.app.getApplications();
    this.app.getApplications().subscribe(data => {
      this.applicationNameList = data;
    });
    this.app.getScreens().subscribe(data => {
      this.screenMap = data;
    });
  }
  updateScreensList() {
    this.screenName = 'Choose Screen';
    this.screenList = this.screenMap[this.appName];
    const app = this.applicationNameList.find(o => o.name == this.appName);
    this.app.getTestComponents(app.id).subscribe(data => {
      this.testComponentList = data;
    });
  }
  runTest() {
    this.app.startTesting(this.appName, this.screenName,this.componentID,this.dataFromDBCheckbox,sessionStorage.auth_user).subscribe(date => {
      console.log('test running');
    });

  }

  changeComponent() {
    this.screenName = 'Choose Screen';
  }

  changeScreen() {
    this.componentID = 'Choose Component';
  }
}
