import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { TCModalService } from '../../../ui/services/modal/modal.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'page-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class PageDepartmentsComponent extends BasePageComponent implements OnInit, OnDestroy {
  departments: any[];

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private modal: TCModalService,
    private formBuilder: FormBuilder,
    public router: Router
  ) {
    super(store, httpSv,router);

    this.pageData = {
      title: 'Departments',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Departments'
        }
      ]
    };
    this.departments = [];
  }

  ngOnInit() {
    super.ngOnInit();

    this.getData('assets/data/departments.json', 'departments', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
