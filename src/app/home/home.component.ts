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

  private applicationsList: Observable<Lookup>;
  private screenList: any;
  private screenMap; any;
  appName: string;
  screenName: string;

  constructor(private app: AppService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.applicationsList = this.app.getApplications();
    this.app.getScreens().subscribe(data => {
      this.screenMap = data;
    });
  }
  updateScreensList() {
    this.screenName = '';
    this.screenList = this.screenMap[this.appName];
  }
  runTest() {
    const data = { selectedScreenName: '', screen: '' };
    this.app.startTesting(data).subscribe(date => {
      console.log('test running');
    });

  }
}
