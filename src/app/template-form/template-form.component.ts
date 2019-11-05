import { Component, OnInit } from '@angular/core';
import {Users} from '../shared/model/users';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  Model = new Users(); 

  Save(para){
    console.log(para);
  }
}
