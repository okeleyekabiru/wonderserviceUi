import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../../../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { IOption } from '../../../../ui/interfaces/option';
import { Router } from '@angular/router';
import { AdminService } from '../../../../../app/services/admin.service';
import { IUser } from '../../../../../app/model/Nofication';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'page-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class PageEditAccountComponent extends BasePageComponent implements OnInit, OnDestroy {
  userInfo:IUser
  userForm: FormGroup;
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  changes: boolean;
  passwordForm: FormGroup
  
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private formBuilder: FormBuilder,
    public router: Router,
    private adminService: AdminService,
    private toastr : ToastrService
  ) {
    super(store, httpSv,router);

    this.pageData = {
      title: 'Edit account',
      loaded: true,
      breadcrumbs: [
        {
          title: 'Apps',
          route: 'default-dashboard'
        },
        {
          title: 'Service pages',
          route: 'default-dashboard'
        },
        {
          title: 'Edit account'
        }
      ]
    };
   
    this.defaultAvatar = 'assets/img/male.jfif';
    this.currentAvatar = this.defaultAvatar;
    this.changes = false;
  
  }

  ngOnInit() {
    super.ngOnInit();
    this.createForm()
    this.adminService.GetUser().subscribe({
      next: d => {
        this.userInfo = d;
        this.inituserForm(this.userInfo)
        this.setLoaded();
  } 
})
     
  }
  createForm() {
    this.passwordForm = this.formBuilder.group({
      oldPassword: new FormControl("", [Validators.required,Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)]),
      newPassword: new FormControl("", [Validators.required,Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)]),
      confirmPassword: new FormControl("",[Validators.required,Validators.minLength(8), Validators.maxLength(15),Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)]),
      
  },{validator: this.passwordConfirming})
  }
 
  
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('newPassword').value !== c.get('confirmPassword').value) {
        return {invalid: true};
    }
}
  get confirmPassword() {
    
    return this.passwordForm.get("confirmPassword")
  }
  get newPassword() {
    return this.passwordForm.get("newPassword")
  }
  get oldPassword() {
    return this.passwordForm.get("oldPassword")
  }
  
  onSubmit() {
  
    const oldPassword = this.passwordForm.value.oldPassword
    const newPassword = this.passwordForm.value.newPassword
    const body = {oldPassword,newPassword}
    this.adminService.updatePassword(body).subscribe({
      next: d => {
        this.toastr.success(d.message)
}
    })
  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }


  // init form
  inituserForm(data:IUser) {
    this.userForm = this.formBuilder.group({
      img: [this.currentAvatar],
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      number: [data.phoneNumber, Validators.required],
      email: [data.email, Validators.required],
    });

    // detect form changes
    this.userForm.valueChanges.subscribe(() => {
      this.changes = true;
    });
  }
  get firstName() {
  return this.userForm.get("firstName")
  }
  get lastName() {
    return this.userForm.get("lastName")
  }
  get number() {
    return this.userForm.get("number")
  }
  get email() {
    return this.userForm.get("email")
  }
  get img() {
    return this.userForm.get("img")
  }
  // save form data
  saveData(form: FormGroup) {
    console.log(form.value)
    if (form.valid) {
      this.userInfo = form.value;
      this.changes = false;
      this.adminService.UpdateUser(this.userInfo).subscribe({
        next: d => {
          this.toastr.success(d.message,"update user")
        }
      })
    }
  }

  // upload new file
  onFileChanged(inputValue: any) {
    let file: File = inputValue.target.files[0];
    let reader: FileReader = new FileReader();

    reader.onloadend = () => {
      this.currentAvatar = reader.result;
      this.changes = true;
    };

    reader.readAsDataURL(file);
  }
}
