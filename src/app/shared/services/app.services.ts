import {HttpClient, HttpHeaders} from '@angular/common/http';
import { OnInit, Injectable } from '@angular/core';

@Injectable({'providedIn': 'root'})

export class productServices{
    private httpHeader: HttpHeaders;
    private allProducts = "http://localhost:4000/api/all-product";
    private allSubCategory = "http://localhost:4000/api/all-subcategory";
    private newProduct = "http://localhost:4000/api/add-new-product";
    private deleteProductURL = "http://localhost:4000/api/delete-product";
    private fileUploadURL = "http://localhost:4000/api/image-upload"; 
    constructor(private http: HttpClient){
        this.httpHeader = new HttpHeaders({'Content-Type': 'application/json'})
        this.httpHeader.append('Content-Type', 'application/file');
    }
    productDetails(){
        return this.http.get(this.allProducts, {headers: this.httpHeader});
    }

    subcategoryDetails(){
        return this.http.get(this.allSubCategory, {headers: this.httpHeader});
    }

    addNewProduct(data){
        return this.http.post(this.newProduct, JSON.stringify(data), {headers: this.httpHeader});
    }
    deleteProduct(id){
        return this.http.delete(this.deleteProductURL + "/" + id, {headers: this.httpHeader})
    }
    uploadImage(img){
        // alert(JSON.stringify(img));
        return this.http.post(this.fileUploadURL , img);
    }
}