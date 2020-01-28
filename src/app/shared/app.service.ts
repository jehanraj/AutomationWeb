import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) { }

  loginUser(user: any) {
    return this.http.post(environment.baseurl + 'dropdown/getAllInterfaceNames', user);
  }
  getApplications() {
    return this.http.get(environment.baseurl + 'dropdown/getAllInterfaceNames');
  }
  getScreens() {
    return this.http.get(environment.baseurl + 'dropdown/getAllInterfaceNames');
  }
}
