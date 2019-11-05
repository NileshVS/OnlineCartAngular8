import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder,FormGroup} from '@angular/forms';
import {Users} from '../shared/model/loginUsers';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  form: FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      'username': ['', [Validators.required, Validators.minLength(5)]],
      'password': ['', Validators.required]
    });
  }

  Save(data){
    console.log(data);
  }

}
