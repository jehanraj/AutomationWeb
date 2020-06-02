import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private isCollapsed = true;
  currentUser: String;

  constructor() { 
    
  }

  ngOnInit() {
    this.currentUser = sessionStorage.auth_user;
  }

  logout() {
    sessionStorage.removeItem("auth_user");
  }
}
