import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { BasePageComponent } from '../base-page';
import { IAppState } from '../../interfaces/app-state';
import { HttpService } from '../../services/http/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class PageSettingsComponent extends BasePageComponent implements OnInit {
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    public router: Router
  ) {
    super(store, httpSv,router);

    this.pageData = {
      title: 'Settings',
      loaded: false,
      breadcrumbs: [
        {
          title: 'Dashboards',
          route: 'default-dashboard'
        },
        {
          title: 'Settings'
        }
      ]
    };
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    this.setLoaded()
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
