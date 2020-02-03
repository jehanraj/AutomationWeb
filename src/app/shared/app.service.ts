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
  
  getScreens() {
    return this.http.get(environment.baseurl + 'dropdown/getAllInterfaceNames');
  }
  getApplicationScreens() {
    return this.http.get(environment.baseurl + 'loginSubmit');
  }
  postTestSuite(app: string, screen: string, fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('appName', appName);
    formData.append('appURL', appURL);
    formData.append('appBrowser', appBrowser);
    return this.http.post(environment.baseurl + 'updateApplicationDetails', formData)
      .pipe((data) => data);
  }
  
  postApplicationDetails(appName: string, appURL: string, appBrowser: string,fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('appName', appName);
    formData.append('appURL', appURL);
    formData.append('appBrowser', appBrowser);
    return this.http.post(environment.baseurl + 'updateApplicationDetails', formData)
      .pipe((data) => data);
  }

  startTesting(data: any) {
    return this.http.post(environment.baseurl + 'startTest', data);
  }
}
