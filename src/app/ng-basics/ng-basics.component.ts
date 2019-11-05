import { Component, OnInit } from '@angular/core';
import {CourseDetails} from '../courseDetails';

@Component({
  selector: 'app-ng-basics',
  templateUrl: './ng-basics.component.html',
  styleUrls: ['./ng-basics.component.css']
})
export class NgBasicsComponent implements OnInit {
  public name="Nilesh";
  public selection;
  // courses: Array<string> = ["Angular", "NodeJS", "Express", "Mongoose"];
  courses:Array<string>; 
  constructor( private courseDetails : CourseDetails){
    // let courseDetails = new CourseDetails();
    this.courses = courseDetails.courses();
  }

  ngOnInit() {
  }

}
