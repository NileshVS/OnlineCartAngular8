import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import {productServices} from '../shared/services/app.services';
import {FormGroup,FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isLoading: boolean = false;
  formGrpUpdate: FormGroup;
  userCart: Object;
  updateProdId: any;
  updateToggle: boolean = false;
  deleteProdId: any;
  deleteToggle: boolean =false;
  items;

  constructor(private ps: productServices, private spinner: NgxSpinnerService, private fb: FormBuilder) { }

  ngOnInit() {
    let localCart = JSON.parse(localStorage.getItem('cart'));
      this.items = localCart.data.reduce((prevValue, nextValue )=> prevValue + nextValue.totalPrice * nextValue.quantity, 0);
      // console.log(items);
    this.spinner.show();
    this.isLoading = true;
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.isLoading = false;
    }, 2000);

    this.formGrpUpdate = this.fb.group({
      'quantity': [""]
    });

    this.ps.userCart().subscribe( item => {
      this.userCart = item;
    // console.log(this.userCart);
      localStorage.setItem('cart', JSON.stringify(this.userCart));
    });
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

}
