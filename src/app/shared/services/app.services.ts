import {HttpClient, HttpHeaders} from '@angular/common/http';
import { OnInit, Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators'
import {Users} from '../model/loginUsers';

@Injectable({'providedIn': 'root'})

export class productServices{
    private httpHeader: HttpHeaders;
    private pagination = 'http://localhost:4000/api/pagination';
    private allProducts = "http://localhost:4000/api/all-product";
    private allSubCategory = "http://localhost:4000/api/all-subcategory";
    private allCategory = "http://localhost:4000/api/all-category";
    private newProduct = "http://localhost:4000/api/add-new-product";
    private deleteProductURL = "http://localhost:4000/api/delete-product";
    private updateProductURL = "http://localhost:4000/api/update-product";
    private fileUploadURL = "http://localhost:4000/api/image-upload"; 
    private fileUploadedTempURL = "http://localhost:4000/api/image-retrieve";
    private fileDeleteTempURL = "http://localhost:4000/api/image-delete";
    private deleteCategoryURL = "http://localhost:4000/api/delete-category";
    private addCategoryURL="http://localhost:4000/api/add-new-category";
    private categoryPaginationURL = "http://localhost:4000/api/category-pagination";
    private subcategoryPaginationURL = "http://localhost:4000/api/subcategory-pagination";
    private addSubcategoryURL="http://localhost:4000/api/add-new-subcategory";
    private deleteSubcategoryURL = "http://localhost:4000/api/delete-subcategory";
    private userLoginURL= "http://localhost:4000/api/user-login";
    private newUserRegisterURL="http://localhost:4000/api/new-user-register";
    private forgotPasswordRequestURL ="http://localhost:4000/api/reset-request";
    private loggedInUserURL = 'http://localhost:4000/api/me';
    private forgotPasswordURL = "http://localhost:4000/api/reset-password";
    private addToCartURL="http://localhost:4000/api/add-to-cart";
    private userCartURL = "http://localhost:4000/api/usercart";

    constructor(private http: HttpClient){
        
        let token = localStorage.getItem("currentUser");
        this.httpHeader = new HttpHeaders({'Content-Type': 'application/json'})
        this.httpHeader.append('Content-Type', 'application/file');
        this.httpHeader.set("x-auth-token", token);
    }
    prodPagination(){
        return this.http.get(this.pagination, {headers: this.httpHeader});
    }
    productDetails(){
        return this.http.get(this.allProducts, {headers: this.httpHeader});
    }

    subcategoryDetails(){
        return this.http.get(this.allSubCategory, {headers: this.httpHeader});
    }

    categoryDetails(){
        return this.http.get(this.allCategory, {headers: this.httpHeader});
    }

    addNewProduct(data){
        return this.http.post(this.newProduct, JSON.stringify(data), {headers: this.httpHeader});
    }

    updateProduct(data, id){
        return this.http.put(this.updateProductURL + "/" + id, JSON.stringify(data), {headers: this.httpHeader});
    }
    deleteProduct(id){
        return this.http.delete(this.deleteProductURL + "/" + id, {headers: this.httpHeader})
    }
    uploadImage(img){
        // alert(JSON.stringify(img));
        return this.http.post(this.fileUploadURL , img);
    }
    TempImgRetrive(){
        return this.http.get(this.fileUploadedTempURL, {headers: this.httpHeader});
    }
    TempImgDelete(image){
        return this.http.delete(this.fileDeleteTempURL + "/" + image, {headers: this.httpHeader});
    }
    deleteCategory(id){
        return this.http.delete(this.deleteCategoryURL + "/" + id, {headers: this.httpHeader});
    }
    addNewCategory(data){
        return this.http.post(this.addCategoryURL, JSON.stringify(data), {headers: this.httpHeader});
    }
    categoryPagination(){
        return this.http.get(this.categoryPaginationURL, {headers: this.httpHeader});
    }
    subcategoryPagination(){
        return this.http.get(this.subcategoryPaginationURL, {headers: this.httpHeader});
    }
    addNewSubcategory(data){
        return this.http.post(this.addSubcategoryURL, JSON.stringify(data), {headers: this.httpHeader});
    }
    deleteSubcategory(id){
        return this.http.delete(this.deleteSubcategoryURL + "/" + id, {headers: this.httpHeader});
    }
    userLogin(data):Observable<Users>{
        return this.http.post<Users>(this.userLoginURL, JSON.stringify(data), {headers : this.httpHeader})
        .pipe(map(item => {
            if(item && item.token){
                localStorage.setItem('currentUser', JSON.stringify(item.token) );
            }
            return item;
        }));
    }
    newUserRegister(data){
        return this.http.post(this.newUserRegisterURL, JSON.stringify(data), {headers : this.httpHeader});
    }
    forgotPassword(data){
        return this.http.post(this.forgotPasswordRequestURL, JSON.stringify(data), {headers : this.httpHeader});
    }

    loggedInUser():Observable<Users> {
        let token = JSON.parse(localStorage.getItem("currentUser"));
        return this.http.get<Users>(this.loggedInUserURL, {headers:{"x-auth-token": token}})
        .pipe(map((data :any) =>{
            if(data){
                localStorage.setItem('currentUsername', data.firstname);
            }
            if(data && data.isAdmin){
                localStorage.setItem('isAdmin', data.isAdmin);
            }
            // location.reload();
            return data;
        }));
    }

    forgotConfirm(data,id){
        return this.http.post(this.forgotPasswordURL+ "/"+ id, JSON.stringify(data), {headers : this.httpHeader});
    }

    addToCart(data){
        let token = JSON.parse(localStorage.getItem("currentUser"));
        // console.log(token);
        return this.http.post(this.addToCartURL, JSON.stringify(data), {headers: this.httpHeader.set('x-auth-token', token)});
    }

    userCart(){
        let token = JSON.parse(localStorage.getItem("currentUser"));
        return this.http.get(this.userCartURL, {headers: this.httpHeader.set('x-auth-token', token)});
    }
}