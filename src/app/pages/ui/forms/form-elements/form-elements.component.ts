import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { BasePageComponent } from '../../../base-page';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { IOption } from '../../../../ui/interfaces/option';
import { Router } from '@angular/router';

@Component({
  selector: 'page-form-elements',
  templateUrl: './form-elements.component.html',
  styleUrls: ['./form-elements.component.scss']
})
export class PageFormElementsComponent extends BasePageComponent implements OnInit, OnDestroy {
  autocompleteData: string[];
  selectData: IOption[];

	constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    public router: Router
  ) {
    super(store, httpSv,router);

    this.pageData = {
      title: 'Form elements',
      loaded: true,
      breadcrumbs: [
        {
          title: 'UI Kit',
          route: 'default-dashboard'
        },
        {
          title: 'Forms',
          route: 'default-dashboard'
        },
        {
          title: 'Elements'
        }
      ]
    };
    this.autocompleteData = [];
    this.selectData = [];
	}

  ngOnInit() {
    super.ngOnInit();

    this.getData('assets/data/autocomplete.json', 'autocompleteData');
    this.getData('assets/data/options.json', 'selectData');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
