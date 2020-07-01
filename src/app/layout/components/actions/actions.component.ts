import { Component, EventEmitter, Input, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../../../services/http/http.service';
import { NotificationService } from '../../../../app/services/notificationservice/notification.service';
import { MyNotification } from '../../../../app/model/Nofication';

@Component({
  selector: 'actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  notifications: MyNotification[] = new Array<MyNotification>();  
  notificationType:string
  messages: any[];
  serviceTypes:any[]
  files: any[];
  closeDropdown: EventEmitter<boolean>;
  @Input() layout: string;

  constructor(
    private httpSv: HttpService,
    private router: Router,
    private notificationService: NotificationService,
    private _ngZone: NgZone,
    
  ) {
    this.messages = [];
    this.files = [];
    
    this.closeDropdown = new EventEmitter<boolean>();
    this.layout = 'vertical';
    this.subscribeToEvents();  
  }

  ngOnInit() {
    // this.getData('assets/data/navbar-notifications.json', 'notifications');
    // this.getData('assets/data/navbar-messages.json', 'messages');
    // this.getData('assets/data/navbar-files.json', 'files');
  
  }
  // appendIcon() {
  //   this.notifications.forEach(e => {
  //     if (e.ServiceType.toLowerCase() == "fumigation") {
  //       e.icon.
  //     }
  //  })
  // }
  getData(url: string, dataName: string) {
    this.httpSv.getData(url).subscribe(
      data => {
        this[dataName] = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  private subscribeToEvents(): void {  
    this.notificationService.messageReceived.subscribe((notification: MyNotification[]) => {  
      console.log(notification)
      this.notificationService.typeConnected.subscribe((e:string) => {
        this.notificationType = e
        console.log(this.notificationType)
      })
      this._ngZone.run(() => {  
        notification.forEach(e => {
          e.entry = new Date()
          this.notifications.push(e);  
        
      })
       
      });  
    });  
     
  }  
  onCloseDropdown() {
    this.closeDropdown.emit(true);
  }

  goTo(event: Event, link: string, layout: string = '') {
    event.preventDefault();

    this.onCloseDropdown();

    setTimeout(() => {
      this.router.navigate([layout ? layout : this.layout, link]);
    });
  }
}
