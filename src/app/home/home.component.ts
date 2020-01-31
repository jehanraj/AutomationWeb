import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private applicationsList: Observable<Object>;
  private screensList: Observable<Object>;
  private apps: string[];
  private sr: string[];
  appName: string = "test";
  screenName: string = "scr";

  constructor(private app: AppService) { }

  ngOnInit() {
    this.loadData();
  }
  loadApplications() {
    this.applicationsList = this.app.getApplications();
  }
  loadScreens() {
    this.screensList = this.app.getScreens();
  }
  loadData() {
    this.app.getApplicationScreens().subscribe(data => {
      this.apps = data['applicationNameList'];
      this.sr = data['screenDetailsList'];
    });
  }

  runTest() {
    const data = { app: '', screen: '' };
    this.app.startTesting(data).subscribe(date => {
      console.log('test running');
    });

  }
}
