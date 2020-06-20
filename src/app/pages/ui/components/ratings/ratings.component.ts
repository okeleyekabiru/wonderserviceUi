import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BasePageComponent } from '../../../base-page';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class PageRatingsComponent extends BasePageComponent implements OnInit, OnDestroy {
  reactiveForm: FormGroup;

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private formBuilder: FormBuilder,
    public router: Router
  ) {
    super(store, httpSv,router);

    this.pageData = {
      title: 'Ratings',
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
          title: 'Ratings'
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
      ratingField: [4]
    });
  }
}
