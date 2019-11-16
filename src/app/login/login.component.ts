import { Component, OnInit } from '@angular/core';
import {productServices} from '../shared/services/app.services';
import {FormBuilder, Validator, FormGroup} from '@angular/forms';

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
  constructor(private ps: productServices, private fb: FormBuilder) { }

  ngOnInit() {
    this.formGrpLogin = this.fb.group({
      'userLogin': this.fb.group({
        'userEmail':[""],
        'userPassword': [""]
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
    console.log(val);
    this.ps.userLogin(val).subscribe(item => {
      console.log(item);
    });
  }

  proceedRegister(val){
    console.log(val);
    this.ps.newUserRegister(val).subscribe(item =>{
      console.log(item);
    });
  }
}
