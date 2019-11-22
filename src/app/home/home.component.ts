import { Component, OnInit, ElementRef } from '@angular/core';
import {productServices} from '../shared/services/app.services';
import { NgxSpinnerService } from "ngx-spinner";
import {FormGroup,FormBuilder} from "@angular/forms";
import { ModalService } from '../_modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formGrp: FormGroup;

  prodId;
  addToCart:Boolean= false;
  user;
  isUserAdmin: Boolean = false;
  pgData;
  isLoading:Boolean;
  p:number=1;
  searchFilter: any = {name: ''}; //searchFilter model for custom pipe
  
  constructor(private ps: productServices, private spinner: NgxSpinnerService, private fb: FormBuilder, private modalService: ModalService) { }

  ngOnInit() {
    this.spinner.show();
        this.isLoading = true;
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.isLoading = false;
        }, 2000);
    
    this.formGrp = this.fb.group({
      'cartDetails': this.fb.group({
        'prodId': [""],
        'quantity': [""]
      })
    });

    this.ps.prodPagination().subscribe( item => {
      this.pgData = item;
      // console.log(this.pgData);
    });

    this.ps.loggedInUser().subscribe( item => {
      // console.log(item);
      this.user = item;
      if(this.user.isAdmin){
        this.isUserAdmin = true;
      }
      else{
        this.isUserAdmin = false;
      }
    });
  }

  a2c(pId){
    this.prodId = pId;
    if(this.addToCart == false){
      this.addToCart = true;
    }
    else{
      this.addToCart = false;
    }
    // console.log(pId);
  }

  addToMyCart(data){
    alert("Item added successfully");
    this.addToCart = false;
    let currentData = data;
    currentData.cartDetails.prodId = this.prodId;
    console.log(currentData);
    this.ps.addToCart(currentData).subscribe( item =>{
        console.log(item);
    });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
