import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as socketIo from 'socket.io-client';

import {MessageModel} from "./message.model";
import { Event } from './event.model';

const SERVER_URL = 'http://localhost:7777';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket;

  constructor() { }

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public send(message: MessageModel): void {
    this.socket.emit('message', message);
  }

  public onMessage(connection: string): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(connection, (data: any) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

}
