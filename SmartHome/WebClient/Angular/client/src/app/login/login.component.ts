import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service'; 
import { CheckformserviceService } from '../checkformservice.service';
import {Router} from '@angular/router';
import{FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  login:String;
  password:String;

  constructor( private checkForm : CheckformserviceService ,
    private flashMessages :FlashMessagesService,
    private router:Router,
    private authService:AuthserviceService  ) { }

  ngOnInit(): void {
  }
  userLoginClick(){

      const user = {
        login: this.login,
        password: this.password, 
      };
      if(user.login != undefined)
      {
        if(user.password != undefined)
        {
          this.authService.loginUser(user).subscribe(data => {            
            if(!data)
            { 
              this.flashMessages.show("Ошибка авторизации",{cssClass:'alert-danger',timeout:4000});
            }
            else
            {
              this.router.navigate(['/dashboard']);
              this.authService.storeUser(data.user,data.token);
            }
          });
        }
        else
        {
          this.flashMessages.show("Password Invalid",{cssClass:'alert-danger',timeout:4000});
        }
      }
      else
      {
        this.flashMessages.show("Login Invalid",{cssClass:'alert-danger',timeout:4000});
      }
  }
}