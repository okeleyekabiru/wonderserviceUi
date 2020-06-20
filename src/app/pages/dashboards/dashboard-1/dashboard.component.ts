import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { EChartOption } from 'echarts';
import { BasePageComponent } from '../../base-page';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { IAppointment } from '../../../../app/ui/interfaces/IAppointment';
import { AdminService } from '../../../../app/services/admin.service';
import { Router } from '@angular/router';

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
    public router: Router
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

  ngOnInit() {
    super.ngOnInit();
    this.adminSv.GetPost().subscribe({
      next: d => {
        this.appointments = d;
        this.setLoaded();
      },
      error: err => {
        console.log(err)
      }
    })

   

  
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
