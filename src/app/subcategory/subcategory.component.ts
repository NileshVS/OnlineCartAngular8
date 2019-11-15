import { Component, OnInit } from '@angular/core';
import {Validator,FormBuilder,FormGroup} from '@angular/forms';
import {productServices} from '../shared/services/app.services';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

  categoryFrmGrp: FormGroup;
  subcategoryFrmGrp: FormGroup;
  //
  newCategory: Boolean;
  newSubcategory: Boolean;
  //
  delCategory: Boolean;
  delCategoryId;

  delSubcategory: Boolean;
  delSubcategoryId;
  //
  categoryName;
  categories;
  subcats;
  //
  searchCat:any = {
    catName: ''
  }

  searchSubcat:any = {
    name: ''
  }
  //
  catP = 1;
  subcatP = 1;
  //
  isLoading;

  constructor( private fb: FormBuilder,private ps: productServices, private spinner: NgxSpinnerService) { }

  ngOnInit() {
        /** spinner starts on init */
        this.spinner.show();
        this.isLoading = true;
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.isLoading = false;
        }, 3000);

    this.categoryFrmGrp = this.fb.group({
      'catName': [""]
    });

    this.subcategoryFrmGrp = this.fb.group({
      'catName': [""],
      'name':[""]
    });
    //all categories
    this.ps.categoryDetails().subscribe( item =>{
      this.categoryName = item;
    });

    //categories pagination 
    this.ps.categoryPagination().subscribe( item =>{
      this.categories = item;
    });

    //subcategory pagination
    this.ps.subcategoryPagination().subscribe( item =>{
      this.subcats = item;
      console.log(this.subcats);
    });
  }

  //Button toggles start here
  addNewCatergory(){
    this.newCategory = true;
  }

  addNewSubcategory(){
    this.newSubcategory = true;
  }

  cancelCategory(){
    this.newCategory = false;
  }

  cancelSubcategory(){
    this.newSubcategory = false;
  }

  confirmDeleteCategory(cat){
    this.delCategory = true;
    this.delCategoryId = cat._id;
  }

  confirmDeleteSubcategory(sub){
    this.delSubcategory = true;
    this.delSubcategoryId = sub._id;
  }

  canDeleteCategory(){
    this.delCategory = false;
    this.delCategoryId = undefined;
  } 

  canDeleteSubcategory(){
    this.delSubcategory = false;
    this.delSubcategoryId = undefined;
  }
  //Button toggles end here

  //API
  deleteCategory(){
    this.ps.deleteCategory(this.delCategoryId).subscribe( () => {
      this.ps.categoryPagination().subscribe( item =>{
        this.categories = item;
        this.ngOnInit;
      });
    });    
  }

  addCategory(data){
    this.ps.addNewCategory(data).subscribe( item => {
      this.ps.categoryPagination().subscribe( item =>{
        this.categories = item;
        this.ngOnInit;
      });
    });
  }

  addSubcategory(data){
    this.ps.addNewSubcategory(data).subscribe( item => {
      this.ps.subcategoryPagination().subscribe( item =>{
        this.subcats = item;
        this.ngOnInit;
      });
    });
  }

  deleteSubcategory(){
    this.ps.deleteSubcategory(this.delSubcategoryId).subscribe( () => {
      this.ps.subcategoryPagination().subscribe( item =>{
        this.subcats = item;
        this.ngOnInit;
      });
    }); 
  }


}
