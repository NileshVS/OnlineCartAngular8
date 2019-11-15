import { Component, OnInit} from '@angular/core';
import {Validators,FormBuilder,FormGroup} from '@angular/forms';
import {productServices} from '../shared/services/app.services';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  formGrp: FormGroup; //variable for formgroup of adding new product
  formGrpUpdate: FormGroup; //variable for formgroup of updating product
  addNewProd: Boolean = undefined; // stores boolean value for button toggle 
  deleteProd:Boolean = undefined; // stores boolean value for button toggle
  deleteProdId= undefined; // stores object ID value for deleting 
  updateProd:Boolean = undefined; // stores boolean value for button toggle
  updateProdId = undefined; // stores object ID value for updating 
  updateProdData; // stores product object value for updating 


  subCategories; //stores all subcategories as an object 
  categories; //stores all categories as an object 
  seletedFile; //stores file as an object 
  fileURL; //stores uploaded file URL as text 

  pgData; //stores all products from pagination API as array of object 
  p:number=1; //currentpage default value for pagination buttons
  
  searchFilter: any = {name: ''}; //searchFilter model for custom pipe

  isLoading:Boolean;

  constructor(private ps: productServices,  private fb: FormBuilder, private spinner: NgxSpinnerService) {}

  ngOnInit() {
        /** spinner starts on init */
        this.spinner.show();
        this.isLoading = true;
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.isLoading = false;
        }, 3000);
    

    this.formGrp= this.fb.group({
      'name': ["", Validators.required],
      'productImage': ["", Validators.required],
      'description': ["", Validators.required],
      'price': ["", Validators.required],
      'offerPrice': ["", Validators.required],
      'isAvailable': ["", Validators.required],
      'isTodayOffer': ["", Validators.required],
      'subCategory':["", Validators.required]
    });

    this.formGrpUpdate = this.fb.group({
      'name': [""],
      'description': [""],
      'price': [""],
      'offerPrice': [""],
      'isAvailable': [""],
      'isTodayOffer': [""],
      'subCategory':[""]
    });
    //lists all sub categories 
    this.ps.subcategoryDetails().subscribe( item =>{
      this.subCategories = item;
    });

    //pagination
    this.ps.prodPagination().subscribe( item => {
      // console.log(item);
      this.pgData = item;
    });
    
    
  }
  // -----------------Button toggles start from here--------------------------
  //Displays Add Product option 
  addProd(){
    this.addNewProd = true;
  }
  // Hides Add Product and Update Product option
  cancel(){
    this.addNewProd = false;
    this.updateProd = false;
  }

  //Displays delete warning well for products
  deleteProduct(prod){
    this.deleteProd = true;
    this.deleteProdId = prod._id;
  }

  //Displays update warning well for products
  updateProduct(prod){
    this.updateProd = true;
    this.updateProdId = prod._id;
    this.updateProdData = prod;
  }
  //Hides delete warning well for products
  cancelDeleteProduct(){
    this.deleteProd = undefined;
  }

  // -----------------Button toggles end here--------------------------

  //-----------------File upload---------------

  fileUpload(event){
    this.seletedFile = event.target.files[0];
    if (event.target.files && event.target.files.length > 0){
      let fileup= new FormData();
      fileup.append('imgUrl', this.seletedFile, this.seletedFile.name);
      // let test = fileup.get('imgUrl');
      // console.log(test);
      this.ps.uploadImage(fileup).subscribe( data => {
        this.fileURL = data;
        // console.log(this.fileURL);
      });
    }
  }

  //-----------------File upload ends---------------


  // -----------------API triggers start from here--------------------------
  //Pushes New Product to API
  saveNewProduct(para){
    // console.log(para); //data from ngForm
    this.ps.addNewProduct(para).subscribe( item => {
      // console.log(item);
       //Displays all products on the products page
    this.ps.productDetails().subscribe(item => {
      this.pgData = item;
      this.ngOnInit();
    });
    });
    alert("New product added successfully");
    
  }


  //Deletes Product
  proceedDeleteProduct(){
    this.ps.deleteProduct(this.deleteProdId).subscribe( item =>{
      // console.log(item);
      alert(`Product is successfully deleted`);

      // this.ps.TempImgDelete(this.fileURL).subscribe( item =>{
      //   console.log(item);
      // });

      this.ps.productDetails().subscribe(item => {
        this.pgData = item;
      });
      this.ngOnInit();
    });
  }

  //Updates product
  updateNewProduct(data){
    this.ps.updateProduct(data, this.updateProdId).subscribe( item => {
      // console.log(item);
      this.ps.productDetails().subscribe(item => {
        this.pgData = item;
      });
      });
      alert("Product updated successfully");
      this.ngOnInit();
  }
}
