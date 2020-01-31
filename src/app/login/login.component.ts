import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private app: AppService) { }

  ngOnInit() {
  }

  loginUser() {
    const user = { 'username': this.username, 'pw': this.password };
    this.app.loginUser(user).subscribe(data => {
      console.log('login complete');
    });
  }
}
