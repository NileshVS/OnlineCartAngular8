import { Component, OnInit } from '@angular/core';
import {productServices} from '../shared/services/app.services';
import {FormBuilder, Validator, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isForgotten: Boolean = false;
  isRegister: Boolean = false;

  formGrpLogin:FormGroup;
  formGrpRegister: FormGroup;
  formGrpForgot: FormGroup;

  messages;
  constructor(private ps: productServices, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.formGrpLogin = this.fb.group({
      'userLogin': this.fb.group({
        'userEmail':["", Validators.required],
        'userPassword': ["", Validators.required]
      })
    });

    this.formGrpRegister = this.fb.group({
      'firstname':[""],
      'lastname': [""],
      'newsLetterCheck': [""],
      'userLogin': this.fb.group({
        'userEmail':[""],
        'userPassword': [""]
      }),
      'termsAcceptCheck': [""]
    });

    this.formGrpForgot = this.fb.group({
      'userLogin': this.fb.group({
        'userEmail': [""]
      })
    });

  }
//Button toggles start here
  forgot(){
    
    if(this.isForgotten == false){
      this.isForgotten = true;
    }
    else{
      this.isForgotten = false;
    }
  }

  register(){
    
    if(this.isRegister == false){
      this.isRegister = true;
    }
    else{
      this.isRegister = false;
    }
  }
  //Button toggles ends here

  //API
  login(val){
    // console.log(val);
    this.ps.userLogin(val).subscribe(item => {
      this.messages = item;
      if(this.messages.msg){
        alert("Invalid credentials, please try again")
      }
      if(this.messages.token){
        this.router.navigateByUrl('/home');
        alert("Login Successful");
      }
    });
  }

  proceedRegister(val){
    // console.log(val);
    this.ps.newUserRegister(val).subscribe(item =>{
      this.messages =item;
      if(this.messages.msg){
        alert(`${this.messages.msg}`);
      }
      if(this.messages.exist){
        alert("User already exist!");
      }
    });
  }

  forgotPass(val){
    // console.log(val);
    this.ps.forgotPassword(val).subscribe( item => {
      this.messages = item;
      if(this.messages.msg){
        alert('Email ID not found');
      }
      if(this.messages.mailCheck){
        alert("Check your mail for further instructions");
      }
    })
  }
}
