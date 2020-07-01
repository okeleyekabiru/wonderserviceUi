import { Injectable, EventEmitter } from '@angular/core';
import { MyNotification } from '../../../app/model/Nofication';
import * as signalR from "@microsoft/signalr";
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  messageReceived = new EventEmitter<MyNotification[]>();  
  connectionEstablished = new EventEmitter<Boolean>();  
  typeConnected = new EventEmitter<string>()
  private connectionIsEstablished = false;  
  private _hubConnection: signalR.HubConnection;  
  
  constructor() {  
    this.createConnection();  
    this.registerOnServerEvents();  
    this.startConnection(); 
  }  
  private createConnection() {  
    this._hubConnection = new signalR.HubConnectionBuilder()  
      .withUrl(
        'https://wonderservice.herokuapp.com/notification')  
      .build();  
  }  
  
  
  private connectionId;
  InvokeNotification() {  
    this._hubConnection.invoke('SendNotification');  
  } 
  private startConnection(): void {  
    this._hubConnection  
      .start()  
      .then(() => {  
        this.connectionIsEstablished = true;  
        console.log('Hub connection started');  
        this.connectionEstablished.emit(true);  
       this.InvokeNotification()

      })  
      .catch(err => {  
        console.log('Error while establishing connection, retrying...');  
        setTimeout(function () { this.startConnection(); }, 5000);  
      });  
  }  
  
  private registerOnServerEvents(): void {  
    this._hubConnection.on('ReceiveMessage', (data: any,type:string) => {  
      this.typeConnected.emit(type)
      this.messageReceived.emit(data);  
    });  
  }  
}
