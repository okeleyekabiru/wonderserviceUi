import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../app/interfaces/app-state';
import { HttpService } from '../../../app/services/http/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { IOption } from '../../../app/ui/interfaces/option';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent extends BasePageComponent implements OnInit {
  Service:IOption[]
  State:IOption[]
  LocalGovernment:IOption[]
  errorMessage: any;
  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  minDate = new Date(this.currentYear, this.currentMonth, this.currentDay);
  skillForm:FormGroup
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private build: FormBuilder,
    private toastr: ToastrService,
    private userService:UserService
  ) {
    super(store, httpSv);
    this.createForm();
    this.pageData = {
      title: 'Form layouts',
      loaded: true,
      breadcrumbs: [
        {
          title: 'UI Kit',
          route: 'default-dashboard'
        },
        {
          title: 'Forms',
          route: 'default-dashboard'
        },
        {
          title: 'Layouts'
        }
      ]
    };
  }
  createForm() {
    this.skillForm = this.build.group({
      daterangepicker: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', Validators.email],
      lastname: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      address: ["", Validators.required],
      servicetype: [Validators.required],
      localGovernment: [Validators.required],
     states:[Validators.required]
    });
  }
  LoadLocalGovernment(event) {
    console.log(event)
    this.userService.loadLocalGovernment(event).subscribe({
      next: d => {
        this.LocalGovernment = d.body;
        
      }
    })
  }
  ngOnInit() {
    this.userService.getServiceType().subscribe({
      next: d => {
        this.Service = d
      },
      error: err => {
        this.toastr.error("an error occured while getting service")
      }
    })
    this.userService.loadState().subscribe({
      next: d => {
        this.State = d.body
     this.setLoaded()
             
      },
      error: err => {
         this.toastr.error("an error occured while getting state")
      }
    })
  }
  get firstname() {
    return this.skillForm.get('firstname');
}
get daterangepicker() {
    return this.skillForm.get('daterangepicker');
}
get email() {
    return this.skillForm.get('email');
}
get lastname() {
  return this.skillForm.get("lastname");
}
get phoneNumber() {
  return this.skillForm.get("phoneNumber");
}
get address() {
  return this.skillForm.get("address");
}
get servicetype() {
  return this.skillForm.get("servicetype")
}
  get states() {
  return this.skillForm.get("states")
  }
  get localGovernment() {
    return this.skillForm.get("localGovernment")
  }
}
