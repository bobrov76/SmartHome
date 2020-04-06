import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { ChatService } from '../chat.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ChatService]
  
})
export class HomeComponent implements OnInit {
  user: string;
  room: string;
  messageText:String;
  messageArray:Array<{user:String,message:String}> = [];
  constructor(private chatService: ChatService) {
    this.chatService.newUserJoined()
    .subscribe(data=> this.messageArray.push(data));

    this.chatService.userLeftRoom()
        .subscribe(data=>this.messageArray.push(data));

        this.chatService.newMessageReceived()
        .subscribe(data=>this.messageArray.push(data));

   }

  ngOnInit(): void { 
    AOS.init({
      offset: 400, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 1000 // values from 0 to 3000, with step 50ms
    });    
  }

  join(){
    this.chatService.joinRoom({user:this.user, room:this.room});
  }

  leave(){
      this.chatService.leaveRoom({user:this.user, room:this.room});
  }

  sendMessage()
  {
    this.chatService.sendMessage({user:this.user, room:this.room, message:this.messageText});
  }

}
