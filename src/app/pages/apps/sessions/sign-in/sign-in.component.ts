import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../../../..//pages/base-page';
import { IAppState } from '../../../../interfaces/app-state';
import { Store } from '@ngrx/store';
import { HttpService } from '../../../../services/http/http.service';

@Component({
  selector: 'page-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class PageSignInComponent extends BasePageComponent implements OnInit {
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
   
  ) {
    super(store, httpSv);
  }

  ngOnInit() { 
    console.log("i loaded")
    this.setLoaded()
  }
}
