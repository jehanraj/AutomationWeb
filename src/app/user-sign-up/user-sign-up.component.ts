import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConfirmEqualValidatorDirective } from '../confirm-equal-validator.directive';
import { ToastrService } from 'ngx-toastr';

declare var NgForm: any;

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.css']
})
export class UserSignUpComponent implements OnInit {

  signUpForm: FormGroup;
  message:string;
  submitted = false;
 

  constructor(private formBuilder: FormBuilder, private app: AppService, private toastr: ToastrService) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userFullName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

  }

  get formval() {
    return this.signUpForm.controls;
  }

  signup() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.signUpForm.invalid) {
        return;
      } else {
        this.app.signUpUser(this.signUpForm.value).subscribe(data => {
          this.toastr.success('', 'User created successfully', {
            timeOut: 3000
          });
        }, (error) => {
          this.message = error.error['message'];
          this.toastr.error(this.message, '', {
          timeOut: 9000
        });
      });
      this.signUpForm.reset();   
      }
  }
}

