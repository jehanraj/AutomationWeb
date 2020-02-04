import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Lookup } from './app.model';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) { }

  loginUser(user: any) {
    return this.http.post(environment.baseurl + 'loginSubmit', user);
  }

  getApplications(): Observable<Lookup> {
    return this.http.get<Lookup>(environment.baseurl + 'applicationNames');
  }

  getScreens(): Observable<any> {
    return this.http.get(environment.baseurl + 'getAllScreenDetails');
  }

  getApplicationScreens() {
    return this.http.get(environment.baseurl + 'loginSubmit');
  }

  postApplicationDetails(appName: string, appURL: string, appBrowser: string, fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('appName', appName);
    formData.append('appURL', appURL);
    formData.append('appBrowser', appBrowser);
    return this.http.post(environment.baseurl + 'updateApplicationDetails', formData)
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
    return this.http.post(environment.baseurl + url, formData);
  }

  startTesting(appName: string, screenName: string) {
    return this.http.post(environment.baseurl + 'startTest?selectedApplicationName=' + appName + '&selectedScreenName=' + screenName, {});
  }

  downloadTemplate() {
    return this.http.get(environment.baseurl + 'template', { responseType: 'blob' });
  }

  getApplicationsForTestReport(): Observable<Lookup> {
    return this.http.get<Lookup>(environment.baseurl + 'loadTestReportDetails');
  }

  getTestedReports(): any {
    return this.http.get(environment.baseurl + 'loadTestReportDetails');
  }
}
