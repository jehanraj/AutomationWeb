import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private app: AppService, private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    const user = { 'userName': this.username, 'password': this.password };
    this.app.loginUser(user).subscribe(data => {
      console.log('login complete');
      this.router.navigateByUrl('');
    });
  }
}
