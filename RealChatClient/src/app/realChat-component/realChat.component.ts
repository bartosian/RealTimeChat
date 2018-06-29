import {Component, ElementRef, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {SocketService} from "../socket.service";

import {MessageModel} from "../message.model";
import { Event } from '../event.model';


declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-real-chat',
  templateUrl: './realChat.component.html',
  styleUrls: ['./realChat.component.css']
})
export class RealChatComponent implements OnInit {
  username = 'User';
  messages: MessageModel[] = [];

  constructor(private authService: AuthService,
              private router: Router,
              private socketService: SocketService) { }

  ngOnInit() {
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.socketService.onEvent(Event.CONNECT)
      .subscribe((msg) => {
        console.log('connected');
        this.socketService.socket.emit('receiveHistory');
      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });

     this.socketService.onMessage('message')
      .subscribe((message: MessageModel) => {
        this.messages.push(message);
      });

    this.socketService.onMessage('history')
      .subscribe((messages: MessageModel[]) => {
      console.log(messages);
        this.messages = messages;
      });
  }

  public sendMessage(message: any): void {
    if (!message) {
      return;
    }

    this.socketService.send(message);
  }

  onLogout() {
    this.authService.logout()
      .subscribe(
        (res) => {
          this.router.navigate(['/login']);
        }
      );
  }

  onAddMessage(messageContent: HTMLTextAreaElement) {
    let message = messageContent.value;
    console.log(message);
    if(message!== '') {
      messageContent.value = ' ';
      this.socketService.socket.emit('msg', message);
            $(".chat-history").animate({ scrollTop: $('.chat-history')[0].scrollHeight}, 1000);

    }
  }
}
