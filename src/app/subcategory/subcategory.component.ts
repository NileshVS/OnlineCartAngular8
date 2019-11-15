import { Component, OnInit } from '@angular/core';
import {Validator,FormBuilder,FormGroup} from '@angular/forms';
import {productServices} from '../shared/services/app.services';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

  categoryFrmGrp: FormGroup;
  subcategoryFrmGrp: FormGroup;

  newCategory: Boolean;
  newSubcategory: Boolean;

  delCategory: Boolean;
  delCategoryId;

  categories;

  searchCat:any = {
    catName: ''
  }
  constructor( private fb: FormBuilder,private ps: productServices) { }

  ngOnInit() {
    this.categoryFrmGrp = this.fb.group({
      'catName': [""]
    });
    //lists all categories 
    this.ps.categoryDetails().subscribe( item =>{
      this.categories = item;
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

  canDeleteCategory(){
    this.delCategory = false;
    this.delCategoryId = undefined;
  } 
  //Button toggles end here

  //API
  deleteCategory(){
    this.ps.deleteCategory(this.delCategoryId).subscribe( () => {
      this.ps.categoryDetails().subscribe( item =>{
        this.categories = item;
        this.ngOnInit;
      });
    });    
  }

  addCategory(data){
    this.ps.addNewCategory(data).subscribe( item => {
      this.ps.categoryDetails().subscribe( item =>{
        this.categories = item;
        this.ngOnInit;
      });
    });
  }
}
