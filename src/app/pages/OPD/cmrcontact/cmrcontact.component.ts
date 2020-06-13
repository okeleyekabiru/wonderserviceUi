import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-cmrcontact',
  templateUrl: './cmrcontact.component.html',
  styleUrls: ['./cmrcontact.component.scss','../addpatient/addpatient//addpatient.component.scss']
})
export class CmrcontactComponent implements OnInit {
  reactiveForm: FormGroup
  builder: FormBuilder
  Salutations:["Mr","Mrs"]
  constructor(private build: FormBuilder) {
    build = this.build
    this.createForm();
   }

  ngOnInit() {
  }
  createForm() {
    this.reactiveForm = this.builder.group({
      Salutation: new FormControl("", Validators.required),
      FirstName: new FormControl("", Validators.required),
      MiddleName: new FormControl("", Validators.required),
      LastName: new FormControl("", Validators.required),
      MobileNo: new FormControl("", Validators.required),
      Email: new FormControl(""),
      BusinessNo: new FormControl(""),
      JobTitle: new FormControl(""),
      Nationality:new FormControl("")

      
      
    })
  }
  Nationality() {
    return this.reactiveForm.get("Nationality")
  }
  JobTitle() {
    return this.reactiveForm.get("JobTitle")
  }
  get BusinessNo() {
    return this.reactiveForm.get("BusinessNo")
  }
  get Email() {
    return this.reactiveForm.get("Email")
  }
  get MobileNo() {
    return this.reactiveForm.get("MobileNo")
  }
  get Salutation() {
    return this.reactiveForm.get("Salutation")
  }
  get FirstName() {
    return this.reactiveForm.get("FirstName")
  }
  get MiddleName() {
    return this.reactiveForm.get("MiddleName")
  }
  get LastName() {
  return this.reactiveForm.get("LastName")
}
}
