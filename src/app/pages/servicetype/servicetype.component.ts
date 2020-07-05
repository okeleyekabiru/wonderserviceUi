import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../app/interfaces/app-state';
import { HttpService } from '../../../app/services/http/http.service';
import { Router } from '@angular/router';
import { UserService } from '../../../app/services/user/user.service';
import { IServiceType } from '../../../app/ui/interfaces/user';
import { TCModalService } from '../../../app/ui/services/modal/modal.service';
import { Content } from '../../../app/ui/interfaces/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../app/services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-servicetype',
  templateUrl: './servicetype.component.html',
  styleUrls: ['./servicetype.component.scss']
})
export class ServicetypeComponent extends BasePageComponent implements OnInit {

  tableData: IServiceType[];
  patientForm: FormGroup
  id: string

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    public router: Router,
    private userService: UserService,
    private modal: TCModalService,
    private fb: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService
  ) {
    super(store, httpSv, router);
    this.initPatientForm()
    this.pageData = {
      title: 'Pagination tables',
      loaded: true,
      breadcrumbs: [
        {
          title: 'Dashboard',
          route: 'default-dashboard'
        },
        {
          title: 'Pagination'
        }
      ]
    };
    
  }
  initPatientForm() {
    this.patientForm = this.fb.group({
      serviceType: ["", Validators.required]
     
    });
  }
  getService(value) {
    this.id = value
  }
  get serviceType() {
    return this.patientForm.get("serviceType")
  }
  
  ngOnInit() {
    if (this.patientForm.dirty || this.patientForm) {
      this.PreventReload();
    }
    this.userService.getServiceType<IServiceType[]>(true).subscribe({
      next: d => {
        this.tableData = d
        this.setLoaded()
      }
    })

   
  }
  delete(value)
  {
    var del=confirm("Are you sure you want to delete this record?");
    if (del==true){
      this.adminService.deleteService(value).subscribe({
        next: d => {
          this.toastr.success("service sucessfully deleted")
          this.closeModal()
          this.allowReload()
          this.userService.getServiceType<IServiceType[]>(true).subscribe({
            next: d => {
              this.tableData = d
            }
          })
        }
        
      })
    }
    return del;
}
  
  OnSubmit() {
    const body:IServiceType = {
      id: this.id,
      serviceType: this.patientForm.value.serviceType
    }
    this.adminService.updateService(body).subscribe({
      next: d => {
        this.toastr.success("service successfully updated")
        this.patientForm.reset()
        this.closeModal()
        this.allowReload()
        this.userService.getServiceType<IServiceType[]>(true).subscribe({
          next: d => {
            this.tableData = d
          }
        })
      }
    })
}
  ngOnDestroy() {
    super.ngOnDestroy();
  }
  closeModal() {
    this.modal.close();
  }
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null) {

    this.modal.open({
      body: body,
      header: header,
      footer: footer,
      options: options
    });
  }

}
