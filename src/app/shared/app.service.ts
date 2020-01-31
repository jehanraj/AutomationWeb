import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) { }

  loginUser(user: any) {
    return this.http.post(environment.baseurl + 'loginSubmit', user);
  }
  getApplications() {
    return this.http.get(environment.baseurl + 'dropdown/getAllInterfaceNames');
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
    formData.append('application', app);
    formData.append('screen', screen);
    return this.http.post(environment.baseurl + 'uploadTestSuite', formData)
      .pipe((data) => data);
  }

  startTesting(data: any) {
    return this.http.post(environment.baseurl + 'startTest', data);
  }
}
