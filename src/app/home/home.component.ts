import { Component, OnInit, ElementRef } from '@angular/core';
import {productServices} from '../shared/services/app.services';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pgData;
  isLoading:Boolean;
  p:number=1;
  searchFilter: any = {name: ''}; //searchFilter model for custom pipe
  
  constructor(private ps: productServices, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
        this.isLoading = true;
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.isLoading = false;
        }, 2000);

    this.ps.prodPagination().subscribe( item => {
      this.pgData = item;
      console.log(this.pgData);
    });
  }
}
