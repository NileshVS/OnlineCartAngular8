import {Injectable} from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root'})

export class RepeatLoginAuthGuard implements CanActivate{
    constructor(private router: Router){}
    canActivate(){
        let checkToken = localStorage.getItem('currentUser');   
        if(checkToken){
            alert('You are already logged in!');
            this.router.navigateByUrl('/home');
            return false;
        }
        return true;
    }
}