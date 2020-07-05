import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { EChartOption } from 'echarts';
import { BasePageComponent } from '../../base-page';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { IAppointment } from '../../../../app/ui/interfaces/IAppointment';
import { AdminService } from '../../../../app/services/admin.service';
import { Router } from '@angular/router';
import { Content } from '../../../../app/ui/interfaces/modal';
import { TCModalService } from '../../../../app/ui/services/modal/modal.service';

@Component({
  selector: 'page-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class PageDashboardComponent extends BasePageComponent implements OnInit, OnDestroy {
 
  appointments: IAppointment[];


  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private adminSv: AdminService,
    public router: Router,
    private modal: TCModalService,
  ) {
    super(store, httpSv,router);

    this.pageData = {
      title: '',
      loaded: false,
      breadcrumbs: [
        {
          title: 'Dashboards',
          route: 'default-dashboard'
        },
        {
          title: 'Default'
        }
      ]
    };
    this.appointments = [];
   
    
    
  }
  Gallery() {
    this.router.navigate(["/vertical/event"])
  }
  closeModal() {
    this.modal.close();
  }
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null) {

    this.modal.open({
      body: body,
      header: header,
      footer: footer,
      options: options
    });
  }
  getValue(e: boolean) {
    if (e) {
      this.closeModal()
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.adminSv.GetPost().subscribe({
      next: d => {
        this.appointments = d;
        this.setLoaded();
      },
      error: err => {
      }
    })

   

  
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
