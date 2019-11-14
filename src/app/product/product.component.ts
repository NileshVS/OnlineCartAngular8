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
  formGrpUpdate: FormGroup;
  addNewProd: Boolean = undefined;
  deleteProd:Boolean = undefined;
  deleteProdId= undefined;
  updateProd:Boolean = undefined;
  updateProdId = undefined;
  
  private imageDefaultValue;
  private  subCategories;
  private categories;
  private seletedFile;

  IPP; //items per page
  public p:number=1; //currentpage
  TI; //total items
  PP; //pagination products
  
  searchFilter: any = {name: ''};

  constructor(private ps: productServices,  private fb: FormBuilder) {}

  ngOnInit() {
    this.formGrp= this.fb.group({
      'name': [""],
      'description': [""],
      'price': [""],
      'offerPrice': [""],
      'isAvailable': [""],
      'isTodayOffer': [""],
      'subCategory':[""]
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

    //lists all categories 
    this.ps.categoryDetails().subscribe( item =>{
      this.categories = item;
    });

    //pagination
    this.ps.prodPagination().subscribe( item => {
      // console.log(item);
      this.IPP = item.perPage;
      this.PP =item.productData;
      this.TI = item.totalProducts;
    });
    
  }
  // -----------------Button toggles start from here--------------------------
  //Displays Add Product option 
  addProd(){
    this.addNewProd = true;
  }
  // Hides Add Product option
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
      this.ps.uploadImage(fileup).subscribe(); 
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
      this.PP = item;
    });
    });
    alert("New product added successfully");
    this.ngOnInit();
  }


  //Deletes Product
  proceedDeleteProduct(){
    this.ps.deleteProduct(this.deleteProdId).subscribe( item =>{
      // console.log(item);
      alert(`Product is successfully deleted`);
      this.ps.productDetails().subscribe(item => {
        this.PP = item;
      });
      this.ngOnInit();
    });
  }

  //Updates product
  updateNewProduct(data){
    this.ps.updateProduct(data, this.updateProdId).subscribe( item => {
      // console.log(item);
      this.ps.productDetails().subscribe(item => {
        this.PP = item;
      });
      });
      alert("Product updated successfully");
      this.ngOnInit();
  }
}
