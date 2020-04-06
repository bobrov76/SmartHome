import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckformserviceService {

  constructor() { }

  checkInput(txt){
    if(txt == undefined) return false;
    else return true;
  }
}
