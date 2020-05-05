import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AppService } from '../shared/app.service';
import { Lookup } from '../shared/app.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../shared/app.model';

@Component({
  selector: 'app-userapp-mapping-maintenance',
  templateUrl: './userapp-mapping-maintenance.component.html',
  styleUrls: ['./userapp-mapping-maintenance.component.css']
})
export class UserappMappingMaintenanceComponent implements OnInit {

  applicationsList: string[];;
  usersList: string[];;
  mappingFile: File = null;
  uploadedFileName: string;
  dropdownSettings: IDropdownSettings;
  submitEnable = true;
  fileName: string;
  url;
  templateurl;
  login: Login = {};

  constructor(private app: AppService, private http: HttpClient, private toastr: ToastrService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadData();
   // this.downloadTemplate();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 2,
      noDataAvailablePlaceholderText: 'No Data Available'
    };
  }

  loadData() {
    this.app.getUserAppMappingData().subscribe(data => {
      this.applicationsList = data['applicationsList'];
      this.usersList = data['testUsersList'];
    });
  }

  searchNDownload() {
    this.download();
  }

  download(){
    this.http.post(environment.baseurl + 'downloadUserAppMappingDetails', this.login, { responseType: 'blob' }).subscribe(data => {
      const file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));
      this.fileName = 'UserAndApplicationMappingDetails.xlsx';
    }, (error) => {
      console.log('File not found');
      this.fileName = '';
    });
  }

  handleFileInput(files: FileList) {
    this.mappingFile = files.item(0);
    this.uploadedFileName = files.item(0).name;
  }

  uploadUserMapping(){
    if (this.submitEnable) {
      this.submitEnable = false;
      this.uploadedFileName = '';
      this.app.postUserAppMapping(this.mappingFile).subscribe(data => {
        this.toastr.success('', 'Upload Success', {
          timeOut: 3000
        });
        this.submitEnable = true;
      }, (error) => {
        this.submitEnable = true;
      });
    }
  }

  // downloadTemplate() {
  //   this.http.get(environment.baseurl + 'downloadUserAppMappingTemplate/', { responseType: 'blob' }).subscribe(data => {
  //     const file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });
  //     this.url = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));
  //     this.fileName = 'UserApplicationMapping.xlsx';
  //   }, (error) => {
  //     console.log('File not found');
  //     this.fileName = '';
  //   });
  // }

  onItemSelect(item: any) {
    console.log('onItemSelect:' + item);
  }
  onSelectAll(items: any) {
    console.log('onSelectAll:' + items);
  }
}
