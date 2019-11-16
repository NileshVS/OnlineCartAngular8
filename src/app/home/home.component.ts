import { Component, OnInit, ElementRef } from '@angular/core';
import {productServices} from '../shared/services/app.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products;
  constructor(private ps: productServices) { }

  ngOnInit() {

    this.ps.productDetails().subscribe( item => {
      this.products = item;
      console.log(this.products);
    });
  }
}
