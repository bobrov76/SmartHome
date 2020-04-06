import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthserviceService} from './authservice.service';

@Injectable()
export class IsLoggedIn implements CanActivate{
    constructor(private authServise:AuthserviceService,private router:Router){}

    canActivate(){
        if(this.authServise.isLogIn()) return true;
        else{
            this.router.navigate(['auth']);
            return false;
        }
    }
}