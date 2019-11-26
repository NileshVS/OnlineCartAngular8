import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {productServices} from '../shared/services/app.services';
import {FormGroup,FormBuilder} from "@angular/forms";
import { ModalService } from '../_modal';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  formGrpUpdate: FormGroup;

  userCart = undefined;
  isLoading: boolean = false;

  constructor(private router: Router, private ps: productServices, private spinner: NgxSpinnerService, private fb: FormBuilder, private modalService: ModalService) { }
  user;
  isAdmin;
  ngOnInit() {


  this.user = localStorage.getItem('currentUsername');
  this.isAdmin = localStorage.getItem('isAdmin');
  if(!this.user){
    this.user = undefined;
  }
  if(!this.isAdmin){
    this.isAdmin = false;
  }
  else{
    this.isAdmin = true;
  }
  }

  logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUsername');
    localStorage.removeItem('isAdmin');
    this.router.navigateByUrl('/login');
    this.isAdmin = false;
    this.user = undefined;
  }

}
