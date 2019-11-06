import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CourseDetails} from './courseDetails';
import { OnClick } from './onClick.component';
import { Parent } from './parent.component';
import { Child } from './child.component';
import {ReactiveFormComponent} from './reactive-form/reactive-form.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { NgBasicsComponent } from './ng-basics/ng-basics.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routes';
import { ContactComponent } from './contact/contact.component';
import { CareerComponent } from './career/career.component';
import { ProductComponent } from './product/product.component';
import {HttpClientModule} from  '@angular/common/http';
import { AddProductComponent } from './add-product/add-product.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    OnClick,
    Parent,
    Child,
    ReactiveFormComponent,
    TemplateFormComponent,
    NgBasicsComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    CareerComponent,
    ProductComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [CourseDetails],
  bootstrap: [AppComponent]
})
export class AppModule { }
