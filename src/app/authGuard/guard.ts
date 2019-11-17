import {Injectable} from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root'})

export class AuthGuard implements CanActivate{
    constructor(private router: Router){}
    canActivate(){
        let checkToken = localStorage.getItem('currentUser');   
        if(!checkToken){
            alert('Please login first');
            this.router.navigateByUrl('/login');
            return false;
        }
        return true;
    }
}