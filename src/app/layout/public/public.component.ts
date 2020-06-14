import { Component, OnInit, ElementRef } from '@angular/core';
import { BasePageComponent } from '../../../app/pages/base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../app/interfaces/app-state';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../../app/services/http/http.service';
import { Router } from '@angular/router';
import { BaseLayoutComponent } from '../base-layout';
import * as SettingsActions from '../../store/actions/app-settings.actions';

@Component({
  selector: 'public-layout',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicLayoutComponent extends BaseLayoutComponent implements OnInit {
  constructor(
    store: Store<IAppState>,
    fb: FormBuilder,
    httpSv: HttpService,
    router: Router,
    elRef: ElementRef
  ) {
    super(store, fb, httpSv, router, elRef);
  }
  
  ngOnInit() {
    super.ngOnInit();

    this.getSearchData('assets/data/menu-horizontal.json');
    this.store.dispatch(new SettingsActions.Update({ layout: 'horizontal' }));
   }
}
