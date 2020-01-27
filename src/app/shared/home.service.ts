import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class HomeService {

  constructor(private http: HttpClient) { }

  loginUser() {
    return this.http.get(environment.baseurl + 'dropdown/getAllInterfaceNames');
  }
  getApplications() {
    return this.http.get(environment.baseurl + 'dropdown/getAllInterfaceNames');
  }
  getScreens() {
    return this.http.get(environment.baseurl + 'dropdown/getAllInterfaceNames');
  }
}
