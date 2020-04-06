import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import { tokenNotExpired} from 'angular2-jwt';
import {  CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  token:any;
  user:any;
  constructor(private http:Http,private cookieService:CookieService ) { }

  regUser(user){
    let headers = new Headers();
    headers.append('Content-Type','aplication/json');
    return this.http.post('http://localhost:8080/api/auth/signup',
    user,{headers:headers}).pipe(map(res=>res.json()));
  }

  loginUser(user){
    let headers = new Headers();
    headers.append('Content-Type','aplication/json');    
    headers.append('x-access-token',localStorage.getItem('token'));
    return this.http.post('http://localhost:8080/api/auth/signin',
    user,{headers:headers}).pipe(map(res=>res.json()));
  }

  storeUser(user,token){
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user));

    this.token=token;
    this.user = user;
  }

  logOut(){
    
    ////////////////////  
    const get_data = JSON.parse(localStorage.getItem('user')); 
    this.token = null;
    this.user = null;
    localStorage.clear(); 
    console.log('123');   
    return this.http.get('http://localhost:8080/api/auth/' + get_data.id ).pipe(map(res=>res.json()));
  }

  isLogIn(){
    return tokenNotExpired();
  }

  

}
