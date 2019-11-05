import { Component, OnInit } from '@angular/core';
import {Validators,FormBuilder,FormGroup} from '@angular/forms';
import {productServices} from '../shared/services/app.services';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  formGrp: FormGroup;
  addNewProd: Boolean = undefined;
  private products;
  private subCategories;
  
  constructor(private ps: productServices,  private fb: FormBuilder) {}

  ngOnInit() {
    this.formGrp= this.fb.group({
      'name': [""],
      'image': [""],
      'description': [""],
      'price': [""],
      'offerPrice': [""],
      'isAvailable': [""],
      'isTodayOffer': [""],
      'subCategory':[""]
    });

    //Displays all products on the products page
    this.ps.productDetails().subscribe(item => {
      this.products = item;
    });

    //lists all sub categories 
    this.ps.subcategoryDetails().subscribe( item =>{
      this.subCategories = item;
    })
  }
  //Toggles Add Product option 
  addProd(){
    this.addNewProd = true;
  }
  // Hides Add Product option
  cancel(){
    this.addNewProd = false;
  }
  
  //Pushes New Product to API
  saveAddProductForm(para){
    this.ps.addNewProduct(para).subscribe( item => {
      console.log(item);
    });
  }
}
