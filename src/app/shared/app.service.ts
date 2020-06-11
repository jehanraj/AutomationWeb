import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Lookup, ComponentMapping, TestScenario } from './app.model';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Injectable()
export class AppService {

  constructor(private http: HttpClient,private modalService: NgbModal) { }

  loginUser(user: any) {
    return this.http.post(environment.baseurl + 'loginSubmit', user);
  }

  // getApplications(): Observable<Array<Lookup>> {
  //   return this.http.get<Array<Lookup>>(environment.baseurl + 'applicationNames');
  // }

  getApplications(): Observable<Array<Lookup>> {
    return this.http.get<Array<Lookup>>(environment.baseurl + 'applicationNames/'+sessionStorage.auth_user);
  }

  getScreens(): Observable<any> {
    return this.http.get(environment.baseurl + 'getAllScreenDetails');
  }

  getScreensForTestSuiteCreation(): Observable<any> {
    return this.http.get(environment.baseurl + 'getAllScreenDetailsForTestSuite');
  }

  getApplicationScreens() {
    return this.http.get(environment.baseurl + 'loginSubmit');
  }

  postApplicationDetails(appName: string, appURL: string, appBrowser: string, fileToUpload: File) {
    const formData: FormData = new FormData();
    if(fileToUpload != null)  
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('appName', appName);
    formData.append('appURL', appURL);
    formData.append('appBrowser', appBrowser);
    return this.http.post(environment.baseurl + 'updateApplicationDetails/'+sessionStorage.auth_user, formData)
      .pipe((data) => data);
  }

  postTestSuite(app: string, screen: string, fileToUpload: File) {
    return this.uploadFileForm('uploadTestSuite', app, screen, fileToUpload);
  }

  postTestCase(app: string, screen: string, fileToUpload: File) {
    return this.uploadFileForm('uploadTestCase', app, screen, fileToUpload);
  }

  uploadFileForm(url: string, app: string, screen: string, fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('application', app);
    formData.append('screen', screen);
    return this.http.post(environment.baseurl + url, formData)
      .pipe((data) => data);
  }

  // startTesting(appName: string, screenName: string, componentID: string, dataFromDBCheckbox: string) {
  //   return this.http.post(environment.baseurl + 'startTest?selectedApplicationName=' + appName + '&selectedScreenName=' + screenName + '&selectedComponentID=' + componentID +'&dataFromDBCheckbox='+ dataFromDBCheckbox , {});
  // }

  // getTestedReports(): any {
  //   return this.http.get(environment.baseurl + 'loadTestReportDetails');
  // }
  startTesting(appName: string, screenName: string, componentID: string, dataFromDBCheckbox: string, userName: string) {
    return this.http.post(environment.baseurl + 'startTest?selectedApplicationName=' + appName + '&selectedScreenName=' + screenName + '&selectedComponentID=' + componentID +'&dataFromDBCheckbox='+ dataFromDBCheckbox +'&userName='+ userName, {});
  }

  getTestedReports(): any {
    return this.http.get(environment.baseurl + 'loadTestReportDetails/'+sessionStorage.auth_user);
  }

  downloadTestCase(appName: string, screenName: string) {
    const url = environment.baseurl + 'downloadTestCase?application=' + appName + '&screen=' + screenName;
    return this.http.get(url, { responseType: 'blob' });
  }

  downloadTestSuite(appName: string, screenName: string) {
    const url = environment.baseurl + 'downloadTestSuite?application=' + appName + '&screen=' + screenName;
    return this.http.get(url, { responseType: 'blob' });
  }

  setUser(user: any) {
    sessionStorage.setItem('auth_user', user);
  }

  updateScreenQuery(screenAppID: string, screenQuery: string) {
    const formData: FormData = new FormData();
    formData.append('screenAppID', screenAppID);
    formData.append('screenQuery', screenQuery);
    return this.http.post(environment.baseurl + 'updateScreenQuery', formData)
      .pipe((data) => data);
  }
  saveTestComponent(data: any) {
    return this.http.post(environment.baseurl + 'testComponent/'+sessionStorage.auth_user, data);
  }
  getTestComponents(appId: number): Observable<Lookup> {
    return this.http.get<Lookup>(environment.baseurl + 'testComponent/' + appId);
  }

  getComponentMapping(testid: number): Observable<Array<TestScenario>> {
    return this.http.get<Array<TestScenario>>(environment.baseurl + 'testComponent/mapping/' + testid);
  }

  saveComponentMapping(data: ComponentMapping) {
    return this.http.post(environment.baseurl + 'testComponent/mapping/'+sessionStorage.auth_user, data );
  }

  // getUserAppMappingData(): any {
  //   return this.http.get(environment.baseurl + 'loadUserAppMappings');
  // }

  getUserAppMappingData(): any {
    return this.http.get(environment.baseurl + 'loadUserAppMappings/'+sessionStorage.auth_user);
  }

  postUserAppMapping(fileToUpload: File) {
    return this.uploadFileForm('uploadUserAppMappingDetails', '', '', fileToUpload);
  }

  deleteComponentMapping(data: ComponentMapping) {
    return this.http.put(environment.baseurl + 'testComponent/deleteMapping/', data);
  }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
}
