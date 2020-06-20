import { Component, OnDestroy, OnInit } from "@angular/core";

import { Store } from "@ngrx/store";
import { IPageData } from "../../interfaces/page-data";
import { IAppState } from "../../interfaces/app-state";
import { HttpService } from "../../services/http/http.service";
import * as PageActions from "../../store/actions/page.actions";
import { Subscription } from "rxjs";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
export let browserRefresh = false;

@Component({
  selector: "base-page",
  templateUrl: "./base-page.component.html",
  styleUrls: ["./base-page.component.scss"],
})
export class BasePageComponent implements OnInit, OnDestroy {
  pageData: IPageData;
  subscription: Subscription;

  constructor(
    public store: Store<IAppState>,
    public httpSv: HttpService,
    public router: Router
  ) {}
  PreventReload() {
    window.onbeforeunload = (ev: Event) => {
      ev.returnValue = false;
    };
  }
  ngOnInit() {
    this.pageData
      ? this.store.dispatch(new PageActions.Set(this.pageData))
      : null;
  }

  ngOnDestroy() {
    this.store.dispatch(new PageActions.Reset());
    this.subscription.unsubscribe();
  }

  // get data
  // parameters:
  // * url - data url
  // * dataName - set data to 'dataName'
  // * callbackFnName run callback function with name 'callbackFnName'
  getData(url: string, dataName: string, callbackFnName?: string) {
    this.httpSv.getData(url).subscribe(
      (data) => {
        this[dataName] = data;
      },
      (err) => {
        console.log(err);
      },
      () => {
        callbackFnName && typeof this[callbackFnName] === "function"
          ? this[callbackFnName](this[dataName])
          : null;
      }
    );
  }
  postData(
    url: string,
    dataName: string,
    dataSet?: any,
    callbackFnName?: string
  ) {
    this.httpSv.postData(url, dataSet).subscribe(
      (data) => {
        this[dataName] = data;
      },
      (err) => {
        console.log(err);
      },
      () => {
        callbackFnName && typeof this[callbackFnName] === "function"
          ? this[callbackFnName](this[dataName])
          : null;
      }
    );
  }
  setLoaded(during: number = 0) {
    setTimeout(
      () => this.store.dispatch(new PageActions.Update({ loaded: true })),
      during
    );
  }
}
