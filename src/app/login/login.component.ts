import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerform: FormGroup;
  invalidLogin: boolean = false;
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService: AuthService
  ) { 
    this.loginForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
  });
  
  this.registerform = this.formBuilder.group({
    'firstname': ['', Validators.required],
    'lastname': ['', Validators.required],
    'useremail': ['', Validators.required],
    'password': ['', Validators.required],
    'mobileNo': ['', Validators.required]
});

  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }
    this.authService.loginForm(loginPayload).subscribe((response: any )=> {
      if (response.success === 'Ok') {
          this.authService.setUser(response);
          console.log(response);
      } else {
          console.log(response);
          this.invalidLogin = false;
      }
      
    }, error => {
      console.error(error);
    });
  }

  onSubmitreg() {
    if (this.registerform.invalid) {
      return;
    }
    
    const registerReq = {
      firstname: this.registerform.controls.firstname.value,
      lastname: this.registerform.controls.lastname.value,
      username: this.registerform.controls.useremail.value,
      password: this.registerform.controls.password.value,
      mobileNo: this.registerform.controls.mobileNo.value,
    }
    console.log(registerReq);
    this.authService.createUser(registerReq)
      .subscribe( data => {
        
      });
  }

}
