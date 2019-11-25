import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {productServices} from '../shared/services/app.services';
import {FormGroup,FormBuilder} from "@angular/forms";
import { ModalService } from '../_modal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  formGrpUpdate: FormGroup;

  updateProdId: any;
  deleteProdId: any;
  updateToggle: boolean = false;
  deleteToggle: boolean = false;

  userCart;

  constructor(private router: Router, private ps: productServices, private fb: FormBuilder, private modalService: ModalService) { }
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

  this.formGrpUpdate = this.fb.group({
    'quantity': [""]
  });

  this.ps.userCart().subscribe( item => {
    this.userCart = item;
  // console.log(this.userCart);
  });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  updateDiag(id){
    this.updateProdId = id;
    if(this.updateToggle == false){
      this.updateToggle = true;
    }
    else{
      this.updateToggle = false;
    }
  }

  removeDiag(id){
    this.deleteProdId = id;
    if(this.deleteToggle == false){
      this.deleteToggle = true;
      return;
    }
    else{
      this.deleteToggle = false;
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

  update(value){
    // console.log(value);
    this.ps.updateCart(this.updateProdId, value).subscribe( item => {
      // console.log(item);
      this.ngOnInit();
    });
  }

  removeConfirm(){
    this.ps.removeCart(this.deleteProdId).subscribe();
    this.ngOnInit();
  }
  test(){
    console.log('works');
  }
}
