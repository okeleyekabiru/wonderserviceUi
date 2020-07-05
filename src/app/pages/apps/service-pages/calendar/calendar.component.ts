import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { BasePageComponent } from '../../../base-page';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { TCModalService } from '../../../../ui/services/modal/modal.service';
import { Content } from '../../../../ui/interfaces/modal';
import { Router } from '@angular/router';
import { IAppointment } from '../../../../../app/ui/interfaces/IAppointment';
import { AdminService } from '../../../../../app/services/admin.service';

@Component({
  selector: 'page-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class PageCalendarComponent extends BasePageComponent implements OnInit, OnDestroy {
  calendarOptions: Options;
  calendarEvents: any[];
  eventBody: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  @ViewChild('modalBody') modalBodyTpl: TemplateRef<any>;
  @ViewChild('modalFooter') modalFooterTpl: TemplateRef<any>;

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    router: Router,
    private modal: TCModalService,
    private adminService:AdminService
  ) {
    super(store, httpSv,router);

    this.pageData = {
      title: 'Events calendar',
      loaded: true,
      breadcrumbs: [
        {
          title: 'Apps',
          route: 'default-dashboard'
        },
        {
          title: 'Service pages',
          route: 'default-dashboard'
        },
        {
          title: 'Events calendar'
        }
      ]
    };

     
  }

  renameCalender(appointment:IAppointment[]):Object[] {
    const arr = []
    let obj = {};
    appointment.forEach(e => {
      obj["title"] = e.serviceType
      obj["color"] = this.getRandomColor()
      obj["textColor"]='#fff'
      obj["start"] = new Date(e.appointmentDate)
      obj['end'] = new Date(e.appointmentDateEnd)
      obj['desc']= `${e.serviceType} service at ${e.address +" "+e.localGovernment+" "+e.states} with ${e.lastName+" "+e.firstName} on ${e.appointmentDate}.\n Contact \n email address ${e.email} \n phone number ${e.phoneNumber}`
      
    
      arr.push(obj);
      obj = {};
    })
   
    return arr;
  }
 getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
   }
   
    return color;
  }
  ngOnInit() {
    
    this.adminService.GetPost().subscribe({
      next: d => {
        this.calendarOptions = {
          editable: true,
          eventLimit: false,
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listMonth'
          },
          events: this.renameCalender(d)
        };
        this.setLoaded()
        
      }
    })
   
   
 
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  setDate(day: number, hour: number = 0) {
    let date = new Date();

    date.setDate(date.getDate() + day);
    date.setHours(date.getHours() + hour);
console.log(date)
    return date;
  }

  dateFormat(date: any) {
    return date.toString().slice(4, 21);
  }

  eventClick(data: any) {
    this.eventBody = {
      title: data.event.title,
      color: data.event.color,
      from: this.dateFormat(data.event.start),
      to:  this.dateFormat(data.event.end),
      desc: data.event.desc
    };
    this.openModal(this.modalBodyTpl, null, this.modalFooterTpl)
  }

  // open modal window
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null) {
    this.modal.open({
      body: body,
      header: header,
      footer: footer,
      options: options
    });
  }

  // close modal window
  closeModal() {
    this.modal.close();
    this.eventBody = {};
  }
}
