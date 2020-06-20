import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../../../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class PageButtonsComponent extends BasePageComponent implements OnInit, OnDestroy {
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    public router: Router
  ) {
    super(store, httpSv,router);

    this.pageData = {
      title: 'Buttons',
      loaded: true,
      breadcrumbs: [
        {
          title: 'UI Kit',
          route: 'default-dashboard'
        },
        {
          title: 'Components',
          route: 'default-dashboard'
        },
        {
          title: 'Buttons'
        }
      ]
    };
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
