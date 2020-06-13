import { Component, ViewEncapsulation, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker, ChangeEventArgs } from '@syncfusion/ej2-calendars';
import {
    PopupOpenEventArgs, EventRenderedArgs, ScheduleComponent, MonthService, DayService, WeekService, WorkWeekService, EventSettingsModel, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { BasePageComponent } from '../../base-page';
@Component({
    selector: 'app-secheduler',
    templateUrl: './scheduleappontment.component.html',
    styleUrls: ['./scheduleappontment.component.scss'],
    styles: [`    
  .custom-event-editor .e-textlabel {
      padding-right: 15px;
      text-align: right;
  }

  .custom-event-editor td {
      padding: 7px;
      padding-right: 16px;
  }`],
    providers: [MonthService, DayService, WeekService, WorkWeekService, ResizeService, DragAndDropService],
    encapsulation: ViewEncapsulation.None
})
export class ScheduleappontmentComponent extends BasePageComponent implements OnInit, OnDestroy {
appoint
    ngOnInit() {
        super.ngOnInit();
        this.setLoaded(10);
  }

  doctorsEventData:any[]
  @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public eventSettings: EventSettingsModel = { dataSource:  this.doctorsEventData
        = [
          {
            Id: 22,
            Description: 'Extraction - Paula',
            EventType: 'New',
            AppointmentDate: new Date(2019, 1, 16, 10, 0),
            EndTime: new Date(2019, 1, 16, 11, 0)
        }, {
            Id: 23,
            Description: 'Observation - George',
            EventType: 'Requested',
            AppointmentDate: new Date(2019, 1, 16, 11, 0),
            EndTime: new Date(2019, 1, 16, 12, 0)
        }, {
            Id: 24,
            Description: 'Therapy - Smith',
            EventType: 'New',
            AppointmentDatee: new Date(2019, 1, 16, 12, 0),
            EndTime: new Date(2019, 1, 16, 13, 30)
        }, {
            Id: 25,
            Description: 'Surgery - Jennifer',
            EventType: 'New',
            AppointmentDate: new Date(2018, 1, 16, 13, 30),
            EndTime: new Date(2018, 1, 16, 15, 30)
        }],fields: {
        id: 'Id',
        subject: { name: 'Description', title: 'EventName' },
        location: { name: 'Location', title: 'Event Location'},
        description: { name: 'Subject', title: 'Event Description' },
        startTime: { name: 'AppointmentDate', title: 'Start Duration' },
        endTime: { name: 'EndTime', title: 'End Duration'  }
    } };
    public selectedDate: Date = new Date(2019, 1, 16);
    public showQuickInfo: boolean = true;
    public startDate: any;
    public endDate: any;
    public statusFields: Object = { text: "StatusText", value: "StatusText" };
    public StatusData: Object[] = [
      { StatusText: 'New', Id: 1 },
      { StatusText: 'Requested', Id: 2 },
      { StatusText: 'Confirmed', Id: 3 }
    ];
    public startDateParser(data: string) {
        if (isNullOrUndefined(this.startDate) && !isNullOrUndefined(data)) {
            return new Date(data);
        } else if (!isNullOrUndefined(this.startDate)) {
            return new Date(this.startDate);
        }
    }
    public endDateParser(data: string) {
        if (isNullOrUndefined(this.endDate) && !isNullOrUndefined(data)) {
            return new Date(data);
        } else if (!isNullOrUndefined(this.endDate)) {
            return new Date(this.endDate);
        }
    }
    public onDateChange(args: ChangeEventArgs): void {
        if (!isNullOrUndefined(args.event)) {
            if (args.element.id === "StartTime") {
                this.startDate = args.value;
            } else if (args.element.id === "EndTime") {
                this.endDate = args.value;
            }
        }
    }
    public onPopupClose(args) {
        this.startDate = null;
        this.endDate = null;
    }
    public onEventRendered(args: EventRenderedArgs): void {
        switch (args.data.EventType) {
            case 'Requested':
                (args.element as HTMLElement).style.backgroundColor = '#F57F17';
                break;
            case 'Confirmed':
                (args.element as HTMLElement).style.backgroundColor = '#7fa900';
                break;
            case 'New':
                (args.element as HTMLElement).style.backgroundColor = '#8e24aa';
                break;
        }
    }

   
 
  public onActionBegin(args: { [key: string]: Object }): void {
    
    
        if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
            let data: any;
            if (args.requestType === 'eventCreate') {
                data = <any>args.data[0];
              // http call to server side on creation
              this.postData("http://localhost:5000/api/appointment", "appoint", data,"setLoaded")

              console.log(data)
              
              
            } else if (args.requestType === 'eventChange') {
              data = <any>args.data;
              //http call to server side on update
              console.log(data)
            
            }
         
            document.querySelector(".e-event-delete").addEventListener("click", () => {
              console.log(data)
              document.querySelector(".e-quick-dialog-delete").addEventListener("click", () => {
                // send delete request
                console.log(data)
              })
            })
           
          
     
            if (!this.scheduleObj.isSlotAvailable(data.AppointmentDate as Date, data.EndTime as Date)) {
              
              args.cancel = true;
             
            }
        }
    }

}
