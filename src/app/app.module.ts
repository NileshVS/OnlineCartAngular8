import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routes';
import { ProductComponent } from './product/product.component';
import {HttpClientModule} from  '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { FilterPipeModule } from 'ngx-filter-pipe';
import { SubcategoryComponent } from './subcategory/subcategory.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductComponent,
    LoginComponent,
    SubcategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgxPaginationModule,
    FilterPipeModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
