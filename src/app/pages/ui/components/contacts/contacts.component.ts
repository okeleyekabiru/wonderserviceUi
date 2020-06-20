import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../../../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { IUser } from '../../../../ui/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'page-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class PageContactsComponent extends BasePageComponent implements OnInit, OnDestroy {
  contacts: IUser[];

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    public router: Router
  ) {
    super(store, httpSv,router);

    this.pageData = {
      title: 'Contacts',
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
          title: 'Contacts'
        }
      ]
    };
  }

  ngOnInit() {
    super.ngOnInit();

    this.getData('assets/data/contacts.json', 'contacts')
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
