import {HttpClient, HttpHeaders} from '@angular/common/http';
import { OnInit, Injectable } from '@angular/core';
import {ProductComponent} from '../../product/product.component';

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

    constructor(private http: HttpClient){
        this.httpHeader = new HttpHeaders({'Content-Type': 'application/json'})
        this.httpHeader.append('Content-Type', 'application/file');
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
}