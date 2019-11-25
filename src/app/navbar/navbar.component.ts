import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private modalService: ModalService) { }
  user;
  isAdmin;
  ngOnInit() {
  this.user = localStorage.getItem('currentUsername');
  this.isAdmin = localStorage.getItem('isAdmin');
  if(!this.user){
    this.user = undefined;
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
  openModal(id: string) {
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}
}
