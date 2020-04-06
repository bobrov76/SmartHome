import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import {Router} from '@angular/router';
import{FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authServise: AuthserviceService,private flashMessages :FlashMessagesService,private router:Router) { } 

  ngOnInit(): void {  }

  logoutUser(){
    this.authServise.logOut().subscribe();
   // 
  }

}

