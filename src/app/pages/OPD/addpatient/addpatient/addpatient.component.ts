import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BasePageComponent } from '../../..//base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.scss']
})
export class AddpatientComponent extends BasePageComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  panelOpenState = false;
  reactiveForm: FormGroup
  patientNumber: string
  branch: any[]
  GeneticsData: any[]
  bloodData: any[]
  validCardData: any[]
  RhesusData: any[]
  dataProvider: any[]
  dataPlan: any[]
  OfficeProvider: any[]

  constructor(private build: FormBuilder,
    store: Store<IAppState>,
    httpSv: HttpService,
  ) {
    super(store, httpSv);
    this.createForm();
  }
  getCard(e) {
    var pattientNo = document.getElementById("patientnumber");
    var patientslabel = document.getElementById("patients");
    if (this.validCardData != undefined || this.validCardData != null) {
      patientslabel.style.display = "none";
     this.patientNumber =e+ this.getRandomInt(1,20)
    }

    
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  ngOnInit() {
    super.ngOnInit()
    this.setLoaded()
    this.getData("assets/data/cards.json", "validCardData", "setLoaded")
  }
  GetBranch() {
    if (this.reactiveForm.value.checkboxField == true) {
      document.getElementById("branch").style.display = "inline"
      this.getData("assets/data/branch.json", "branch", "setLoaded")
    }
    else {
      document.getElementById("branch").style.display = "none"
      
      
    }
  }
  getRhesus(e) {
    
  }
  getGenetic(e) {

  }
  createForm() {
    this.reactiveForm = this.build.group({
      emergencyphone: new FormControl(""),
      policynumber: new FormControl("",Validators.required),
      contact: new FormControl(""),
      validcard: new FormControl(""),
      checkboxField: new FormControl(""),
      bloodgroup: new FormControl(""),
      hpgenotype:new FormControl(""),
      medicalhistory: new FormControl(""),
      allergyhistory: new FormControl(""),
      rhesusfactor:new FormControl(""),
      geneticfactor: new FormControl(""),
      provider:new FormControl(""),
      plan: new FormControl(""),
      branchs: new FormControl(""),
      officeId:new FormControl(""),
      identificationnumber: new FormControl(""),
      lasthospital: new FormControl(""),
      upload:new FormControl("")
    })
  }
  get upload() {
    return this.reactiveForm.get("upload")
  }
  get lasthospital() {
    return this.reactiveForm.get("lasthospital")
  }
  get identificationnumber() {
    return this.reactiveForm.get("identificationnumber")
  }
  get officeId() {
    return this.reactiveForm.get("officeId")
  }
  get branchs() {
    return this.reactiveForm.get("branchs")
  }
  get geneticfactor() {
    return this.reactiveForm.get("geneticfactor")
  }
  get plan() {
    return this.reactiveForm.get("plan")
  }
  get provider() {
    return this.reactiveForm.get("provider")
  }

  get bloodgroup() {
    return this.reactiveForm.get("bloodgroup")
  }
  get hpgenotype() {
    return this.reactiveForm.get("hpgenotype")
  }
  get emergencyphone() {
    return this.reactiveForm.get("emergencyphone")
  }
  get policynumber() {
    return this.reactiveForm.get("policynumber")
  }
  get medicalhistory() {
    return this.reactiveForm.get("medicalhistory")
  }
  get allergyhistory() {
    return this.reactiveForm.get("allergyhistory")
  }
  get rhesusfactor() {
    return this.reactiveForm.get("rhesusfactor")
  }
  get contact() {
    return this.reactiveForm.get("contact")
  }
  get validcard() {
    return this.reactiveForm.get('validcard')
  }
  get checkboxField() {
    return this.reactiveForm.get("checkboxField")
  }
  getBlood(e) {
    
  }
  onSubmit() {
    
    var pattientNo = document.getElementById("patientnumber");
    var patientslabel = document.getElementById("patients");
    console.log(this.reactiveForm.value)
}
}
