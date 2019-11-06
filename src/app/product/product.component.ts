import { Component, OnInit} from '@angular/core';
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
  deleteProd:Boolean = undefined;
  deleteProdId= undefined;
  deleteProdName:String = undefined;
  private products;
  private  subCategories;
  
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
      // console.log(item);
      this.products = item;
    });

    //lists all sub categories 
    this.ps.subcategoryDetails().subscribe( item =>{
      this.subCategories = item;
    })
  }
  // -----------------Button toggles start from here--------------------------
  //Displays Add Product option 
  addProd(){
    this.addNewProd = true;
  }
  // Hides Add Product option
  cancel(){
    this.addNewProd = false;
  }

  //Displays delete warning well for products
  deleteProduct(prod){
    this.deleteProd = true;
    this.deleteProdId = prod._id;
  }

  //Hides delete warning well for products
  cancelDeleteProduct(){
    this.deleteProd = undefined;
  }

  // -----------------Button toggles end here--------------------------

  // -----------------API triggers start from here--------------------------
  //Pushes New Product to API
  saveAddProductForm(para){
    this.ps.addNewProduct(para).subscribe( item => {
      console.log(item);
       //Displays all products on the products page
    this.ps.productDetails().subscribe(item => {
      // console.log(item);
      this.products = item;
    });
    });

    alert({
      name: this.products.data.name
    });
  }


  //Deletes Product
  proceedDeleteProduct(){
    this.ps.deleteProduct(this.deleteProdId).subscribe( item =>{
      console.log(item);
    })
  }

}
