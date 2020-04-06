import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:8080/api";
  constructor(private http:Http){ }
     
  getUsers(){
    var token = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('Content-Type','aplication/json');
    return this.http.get(this.url, {headers: headers}).pipe(map(res=>res.json()));    
  } 
  createUser(user: User){
    var token = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('Content-Type','aplication/json');
    return this.http.post(this.url, JSON.stringify(user), {headers: headers}).pipe(map(res=>res.json()));        
  }
  updateUser(id: number, user: User) {
    var token = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('Content-Type','aplication/json');
    return this.http.put(this.url, JSON.stringify(user), {headers: headers}).pipe(map(res=>res.json()));
  }
  deleteUser(id: number){
      return this.http.delete(this.url + '/' + id);
  }
}