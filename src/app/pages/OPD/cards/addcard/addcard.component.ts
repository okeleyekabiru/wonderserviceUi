import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from '../../../base-page'
import { IAppState } from '../../../../interfaces/app-state';
import { Store } from '@ngrx/store';
import { HttpService } from '../../../../services/http/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IOption } from '../../../../ui/interfaces/option';
// src/app/ui/interfaces/option

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
  styleUrls: ['./addcard.component.scss']
})
export class AddcardComponent extends BasePageComponent implements OnInit ,OnDestroy{
  reactiveForm: FormGroup;
  data: any[]
  branch:string
  cardNumber: string 
  cards:Object
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private form: FormBuilder,
  
  ) {
    super(store, httpSv);
    this.createForm()
   

  }
  ngSubmit() {
    console.log(this.reactiveForm.value)
    console.log(document.getElementById("cardNumber").innerText)
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  getCard(e) {
   this.getData("assets/data/cardgen.json", "cards", "setLoaded")
   
   
    if (this.cards != undefined) { 
      this.cardNumber = this.cards[e].cardName +this.getRandomInt(1,20)
     
    }
    
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
  createForm() { 
    this.reactiveForm =  this.form.group({
      checkboxField: [],
      Note: ["", Validators.required],
      cardname: ["", Validators.required],
      Product: ["", Validators.required],
      branchs: [],
    }

    )
  }
  ngOnInit() {
    super.ngOnInit();
  
    this.getData("assets/data/product.json","data","setLoaded")

  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }
 
  get checkboxField() {
   return this.reactiveForm.get("checkboxField");
  }
  get branchs() {
    return this.reactiveForm.get("branch")
  }
  get Note() {
    return this.reactiveForm.get("Note") 
  }
  get cardname() {
    return this.reactiveForm.get("cardname")
  }
  get Product() {
 return   this.reactiveForm.get("Product")
  }

}
