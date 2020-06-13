import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BasePageComponent } from '../../../base-page';
import { IAppState } from '../../../../interfaces/app-state';
import { Store } from '@ngrx/store';
import { HttpService } from '../../../../services/http/http.service';
@Component({
  selector: 'app-createlog',
  templateUrl: './createlog.component.html',
  styleUrls: ['./createlog.component.scss']
})
export class CreatelogComponent extends BasePageComponent implements OnInit,OnDestroy {
  patientData: any[]
  providerData: any[]
  planData: any[]
  visitData:any[]
  facilityData:any[]
  createForm() {
    this.reactiveForm = this.form.group({
      patients: [],
      Provider: [],
      Plan: [],
      emergency: [], 
      facility: [],
      visittype:[]
    })
  }
  get visittype() {
    return this.reactiveForm.get("visittype")
  }
  get facility() {
    return this.reactiveForm.get("facility")
  }
  get emergency() {
    return this.reactiveForm.get("emergency")
  }
  get Plan() {
    return this.reactiveForm.get("Plan")
  }
  get patients() {
    return this.reactiveForm.get("patients")
  }
  get Provider() {
    return this.reactiveForm.get("Provider")
  }
  reactiveForm:FormGroup
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private form: FormBuilder,
  
  ) {
    super(store, httpSv);
    this.createForm()
   

  }
  ngSubmit() {
    
  }
  ngOnInit() {
    super.ngOnInit()
    this.setLoaded()
  }
  ngOnDestroy() {
  super.ngOnDestroy()
}
}
