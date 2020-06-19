import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;
  private loginFailed = false;
  submitted = false;

  constructor(private app: AppService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    //this.buildForm();
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      rememberMe:['']
    });
  }

  get formControls() { return this.loginForm.controls; }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.minLength(6), Validators.maxLength(20), Validators.required]),
      rememberMe: new FormControl('')
    });
  }

  loginUser() {

    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } 
    this.app.loginUser(this.loginForm.value).subscribe(data => {
      this.app.setUser(this.loginForm.value.userName);
      this.router.navigate(['/']);
    }, (error) => {
      if (error.error.text === 'SUCCESS') {
       // this.app.setUser('SUCCESS');
       this.app.setUser(this.loginForm.value.userName);
        this.router.navigate(['']);
      }
      this.loginFailed = true;
    });
  
  }
}
