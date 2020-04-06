import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private url = 'http://localhost:8080';
  private socket = io(this.url);    
  constructor() {
    
  }

  main(){
    // let headers = new Headers();
    // headers.append("Access-Control-Allow-Origin", "http://localhost:4200");
    // headers.append('Access-Control-Allow-Credentials', 'true');
    // this.socket = io(this.url, headers); 
  }

  joinRoom(data)
  {   this.main();
      this.socket.emit('join',data);
  }

  newUserJoined()
  {   this.main();
      let observable = new Observable<{user:String, message:String}>(observer=>{
          this.socket.on('new user joined', (data)=>{
              observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }

  leaveRoom(data){
       this.main();
      this.socket.emit('leave',data);
  }

  userLeftRoom(){
       this.main();
      let observable = new Observable<{user:String, message:String}>(observer=>{
          this.socket.on('left room', (data)=>{
              observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }

  sendMessage(data)
  {
      this.main();
      this.socket.emit('message',data);
  }

  newMessageReceived(){
      this.main();
      let observable = new Observable<{user:String, message:String}>(observer=>{
          this.socket.on('new message', (data)=>{
              observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }
}