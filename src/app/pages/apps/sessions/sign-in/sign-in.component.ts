import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../../../..//pages/base-page';
import { IAppState } from '../../../../interfaces/app-state';
import { Store } from '@ngrx/store';
import { HttpService } from '../../../../services/http/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class PageSignInComponent extends BasePageComponent implements OnInit {
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    public router: Router
   
  ) {
    super(store, httpSv,router);
  }

  ngOnInit() { 
    console.log("i loaded")
    this.setLoaded()
  }
}
