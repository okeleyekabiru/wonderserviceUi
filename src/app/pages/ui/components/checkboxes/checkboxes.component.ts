import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';
import { BasePageComponent } from '../../../base-page';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.scss']
})
export class PageCheckboxesComponent extends BasePageComponent implements OnInit, OnDestroy {
  reactiveForm: FormGroup;

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private formBuilder: FormBuilder,
    public router: Router
	) {
    super(store, httpSv,router);

    this.pageData = {
      title: 'Checkboxes',
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
          title: 'Checkboxes'
        }
      ]
    };
	}

  ngOnInit() {
    super.ngOnInit();

    this.initReactiveForm();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  initReactiveForm() {
    this.reactiveForm = this.formBuilder.group({
      checkboxField: [true]
    });
  }
}
