import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AppService } from '../shared/app.service';
import { DashBoard } from '../shared/app.model';
import { Lookup, TestScenario, ComponentMapping } from '../shared/app.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  title = 'dashboard';
  chart;
  chart2 = [];
  data1 = [];
  applicationsList: Lookup[];
  screensList: Lookup[];
  dropdownSettingsScreen: IDropdownSettings;
  dropdownSettings: IDropdownSettings;
  dashBoardReport: DashBoard = {};
  rowData: Observable<any>;
  monthDate = 'Month';

  columnDefs = [
    { headerName: 'Application', field: 'testRAppName' },
    { headerName: 'Screen', field: 'testRScreenName' },
    {
      headerName: 'Tested From', field: 'testStartDate', cellRenderer: (data) => {
        return moment(data.value).format('DD-MM-YYYY HH:mm:ss')
      }
    },
    {
      headerName: 'Tested To', field: 'testEndDate', cellRenderer: (data) => {
        return moment(data.value).format('DD-MM-YYYY HH:mm:ss')
      }
    }
  ];

  constructor(private app: AppService,private http: HttpClient,) { }


  ngOnInit() {
    this.loadData();
    this.dashBoardData()

    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 2,
      noDataAvailablePlaceholderText: 'No Data Available'
    };
    this.dropdownSettingsScreen = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 2,
      noDataAvailablePlaceholderText: 'No Data Available'
    };

    

    let options = {
      // aspectRatio: 1,
      // legend: false,
      tooltips: false,

      elements: {
        point: {
          borderWidth: function (context) {
            return Math.min(Math.max(1, context.datasetIndex + 1), 8);
          },
          hoverBackgroundColor: 'transparent',
          hoverBorderColor: function (context) {
            return "red";
          },
          hoverBorderWidth: function (context) {
            var value = context.dataset.data[context.dataIndex];
            return Math.round(8 * value.v / 1000);
          },
          radius: function (context) {
            var value = context.dataset.data[context.dataIndex];
            var size = context.chart.width;
            var base = Math.abs(value.v) / 1000;
            return (size / 24) * base;
          }
        }
      }
    };
  }

loadData() {
  this.app.getTestedReports().subscribe(data => {
    this.applicationsList = data['testAppsList'];
    this.screensList = data['testScreensList'];
  });
}

getDashboardData() {
  return this.http.post(environment.baseurl + 'loadDashBoardDetails', this.dashBoardReport);
}

dashBoardData() {
if (this.chart) this.chart.destroy();

this.getDashboardData().subscribe(data => {
    let totalCase = data[0].totalCase;
    let passedData = data[0].passedData;
    let failedData = data[0].failedData;
    let weatherDates =  data[0].month;

      this.chart = new Chart('bar', {
        type: 'bar',
        options: {
          responsive: true,
          title: {
            display: false,
            text: 'Combo Bar and line Chart'
          },
        },
        data: {
          labels: weatherDates,
          datasets: [
            {
              type: 'bar',
              label: 'Total Test Cases',
              data: totalCase,
              backgroundColor: 'rgba(255,0,255,0.4)',
              borderColor: 'rgba(255,0,255,0.4)',
              fill: true,
            },
              {
              type: 'line',
              label: 'Passed Data',
              
              borderColor: 'rgba(0,0,255,0.4)',
              data: passedData,
              fill: true,
              },
              {
              type: 'line',
              label: 'Failed Data',
              
              borderColor: 'rgba(255, 0, 0, 0.3)',
              data: failedData,
              fill: true,
              },
          ]
        }
      });
  });
}

}
