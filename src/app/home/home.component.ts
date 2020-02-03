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
  private screensList: Observable<Lookup>;
  appName: string = 'test';
  screenName: string = 'scr';

  constructor(private app: AppService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // this.app.getApplicationScreens().subscribe(data => {
    //   this.apps = data['applicationNameList'];
    //   this.sr = data['screenDetailsList'];
    // });
    this.applicationsList = this.app.getApplications();
    this.screensList = this.app.getScreens();
  }

  runTest() {
    const data = { selectedScreenName: '', screen: '' };
    this.app.startTesting(data).subscribe(date => {
      console.log('test running');
    });

  }
}
