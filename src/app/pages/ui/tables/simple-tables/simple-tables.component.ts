import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { BasePageComponent } from '../../../base-page';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-simple-tables',
  templateUrl: './simple-tables.component.html',
  styleUrls: ['./simple-tables.component.scss']
})
export class PageSimpleTablesComponent extends BasePageComponent implements OnInit, OnDestroy {
  tableData: any[];

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    public router: Router
  ) {
    super(store, httpSv,router);

    this.pageData = {
      title: 'Simple tables',
      loaded: true,
      breadcrumbs: [
        {
          title: 'UI Kit',
          route: 'default-dashboard'
        },
        {
          title: 'Tables',
          route: 'default-dashboard'
        },
        {
          title: 'Simple'
        }
      ]
    };
    this.tableData = [];
	}

  ngOnInit() {
    super.ngOnInit();

    this.getData('assets/data/table.json', 'tableData');
	}

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
