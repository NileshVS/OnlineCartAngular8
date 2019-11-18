import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) { }
  user;
  isAdmin;
  ngOnInit() {
  this.user = localStorage.getItem('currentUsername');
  this.isAdmin = localStorage.getItem('isAdmin');
  if(!this.user){
    this.user = 'Guest';
  }
  if(!this.isAdmin){
    this.isAdmin = false;
  }
  else{
    this.isAdmin = true;
  }
  }
  logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUsername');
    localStorage.removeItem('isAdmin');
    this.router.navigateByUrl('/login');
    this.isAdmin = false;
    this.user = undefined;
  }

}
