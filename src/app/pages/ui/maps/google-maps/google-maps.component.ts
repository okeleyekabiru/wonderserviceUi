import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { BasePageComponent } from '../../../base-page';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class PageGoogleMapsComponent extends BasePageComponent implements OnInit, OnDestroy {
	lat: number;
	lng: number;
	
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    public router: Router
  ) {
    super(store, httpSv,router);

    this.pageData = {
      title: 'Google map',
      loaded: true,
      breadcrumbs: [
        {
          title: 'UI Kit',
          route: 'default-dashboard'
        },
        {
          title: 'Maps',
          route: 'default-dashboard'
        },
        {
          title: 'Google map'
        }
      ],
      fullFilled: true
    };
		this.lat = 51.678418;
		this.lng = 7.809007;
	}

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
