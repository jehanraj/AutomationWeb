import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private isCollapsed = true;
  private applicationsList;
  private screensList;

  constructor(private app: AppService) { }

  ngOnInit() {
  }
  loadApplications() {
    this.app.getApplications().subscribe(data => {
      this.applicationsList = data;
    });
  }
  loadScreens() {
    this.app.getScreens().subscribe(data => {
      this.screensList = data;
    });
  }
}
