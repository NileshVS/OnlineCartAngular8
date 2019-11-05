import { Component, OnInit, ElementRef } from '@angular/core';

import {fromEvent} from 'rxjs';
import {map, filter, debounce, debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private ER: ElementRef) { }

  ngOnInit() {
  }

  Save(){
    let search = this.ER.nativeElement.querySelector('#search');
    let p = fromEvent(search, 'keyup')
            .pipe(
              map((e: any) => e.target.value)
            );

            p.subscribe(item => console.log(item));

  }
}
