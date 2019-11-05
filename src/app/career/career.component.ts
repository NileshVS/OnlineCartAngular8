import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {
  para;
  constructor(private ar: ActivatedRoute) { }

  ngOnInit() {
    this.ar.params.subscribe((item) =>{
      let id = item['id'];
      this.para = id;
      console.log(id);
    });
  }

}
