import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service'; 
import { CheckformserviceService } from '../checkformservice.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { Validators, FormControl } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'app-logup',
  templateUrl: './logup.component.html',
  styleUrls: ['./logup.component.css']
})
export class LogupComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  
  hide = true;
  login:String;
  email:String;
  password:String;
  password_rep:String;
  
 
   constructor(
      private checkForm : CheckformserviceService ,
      private flashMessages : FlashMessagesService,
      private router:Router,
      private authService:AuthserviceService,
      iconRegistry: MatIconRegistry, sanitizer: DomSanitizer  
     ) { }
 
   ngOnInit(): void {
     
   }

   

   userRegClick(){
      const user = {
        login: this.login,
        email: this.email,
        password: this.password,
      };
     
 
    if(this.checkForm.checkInput(user.login))
     {
        if(this.checkForm.checkInput(user.email))
        {
          console.log(user.password);
            if(this.checkForm.checkInput(user.password))
            {
              if(this.password == this.password_rep){
              this.authService.regUser(user).subscribe(data => {
                  if(!data)
                  { 
                    this.flashMessages.show("Регистрация не удаласть",{cssClass:'alert-danger', timeout:4000});
                  }
                  else
                  { 
                    this.router.navigate(['/auth']); 
                  }
                });
              }
            } else
            {
              this.flashMessages.show("Пароль не соответствует требованиям безопасности",{ cssClass:'alert-danger',timeout:4000});
            } 
        } 
        else
        {
          this.flashMessages.show("E-mail введен некорректно",{ cssClass:'alert-danger',timeout:4000});
        } 
      } 
      else
      {
        this.flashMessages.show("Login не введен",{ cssClass:'alert-danger', timeout:4000});
      }
  }
}
