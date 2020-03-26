import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { Observable } from 'rxjs';
import { Lookup } from '../shared/app.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private applicationList: Observable<Array<Lookup>>;
  private screenList: any;
  private screenMap; any;
  appName: string;
  screenName: string;
  dataFromDBCheckbox: boolean;

  constructor(private app: AppService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.applicationList = this.app.getApplications();
    this.app.getScreens().subscribe(data => {
      this.screenMap = data;
    });
  }
  updateScreensList() {
    this.screenName = '';
    this.screenList = this.screenMap[this.appName];
  }
  runTest() {
    this.app.startTesting(this.appName, this.screenName,this.dataFromDBCheckbox).subscribe(date => {
      console.log('test running');
    });

  }
}
