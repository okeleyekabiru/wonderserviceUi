import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../app/interfaces/app-state';
import { HttpService } from '../../../app/services/http/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent extends BasePageComponent implements OnInit {

  constructor(
    public store: Store<IAppState>,
    public httpSv: HttpService,
    public router: Router
  ) { 
    super(store,httpSv,router)
  }

  ngOnInit() {
    this.setLoaded();
  }

}
