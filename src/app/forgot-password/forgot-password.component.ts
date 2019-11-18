import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import {productServices} from '../shared/services/app.services';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  id;
  response;
  formGrpForgot: FormGroup;
  constructor( private fb: FormBuilder, private ps:productServices, private ar: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.formGrpForgot = this.fb.group({
      'userLogin': this.fb.group({
        'userPassword': [""]
      })
    });

    this.ar.params.subscribe(item => {
      console.log(item);
      this.id = item.id;
    })
  }

  forgot(data){
    // console.log(data);
    this.ps.forgotConfirm(data, this.id).subscribe( item => {
      this.response = item;
      if(this.response.error){
        {
      alert(this.response.error);
      return;
          // alert(`${JSON.stringify(this.response.error)}`);
        }
      }
      else{
        alert(this.response.success);
        // alert(`${JSON.stringify(this.response.success)}`);
        this.router.navigateByUrl('/login');
      }
    });
  }
}
