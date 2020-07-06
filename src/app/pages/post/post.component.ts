import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BasePageComponent } from '../base-page';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { HttpService } from '../../../app/services/http/http.service';
import { IAppState } from '../../../app/interfaces/app-state';
import { AdminService } from '../../../app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../app/services/user/user.service';
import { IOption } from '../../../app/ui/interfaces/option';
import { Router } from '@angular/router';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent extends BasePageComponent implements OnInit {
  skillForm: FormGroup
  loading: boolean = false;
  imageArray: string[] = []
  DataForm: File[] = []
  Service: IOption[]
  service:string
  imageSrc: string;
  myForm: any;
  va: File
  @Input() edit: boolean = false
  @Output() data:EventEmitter<FormData> = new EventEmitter<FormData>()
  @Output() completed:EventEmitter<boolean> = new EventEmitter<boolean>()
  constructor( store: Store<IAppState>,
    httpSv: HttpService,private fb:FormBuilder,private adminService:AdminService,private toastr:ToastrService,private userService:UserService,public router: Router) {
    super(store, httpSv,router);
    this.createForm()
  }
  GetCurrentService(event) {
    console.log(event)
    this.service = event
  }
  onSubmit(e:Event) {
    e.preventDefault();
    const formData = new FormData()
    for (var i = 0; i < this.DataForm.length; i++){
      formData.append("photo",this.DataForm[i],this.DataForm[i].name)
    }
  
    formData.append('serviceType', this.skillForm.value.servicetype)
    formData.append('body',this.skillForm.value.body)
    this.loading = true;
    if (this.edit) {
      this.data.emit(formData)
      return;
    }
    this.adminService.PostServiceRendered(formData).subscribe({
      next: d => {
        this.toastr.success("post successfully", "Post")
        this.loading = false;
        this.completed.emit(true)
      },
      error: err => {
        this.toastr.error("An error occured while post","Post")
      }
    })
 }
 
 onFileChanged(event) {
   
  const reader = new FileReader();
 
  if(event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    this.DataForm.push(file);
    
    reader.readAsDataURL(file);
  
    reader.onload = () => {

      this.imageSrc = reader.result as string;
      if (this.imageSrc != undefined) this.imageArray.push(this.imageSrc)
   
     
   
      this.skillForm.patchValue({
        photo: this.DataForm
      });
 
    };
 
  }
}
  ngOnInit() {
    this.userService.getServiceType<IOption[]>().subscribe({
      next: d => {
        this.Service =  d
        this.setLoaded();
      },
      error: err => {
        console.log(err)

      }
        
    })
  }
  removeImage(e) {
 
    var index = this.imageArray.indexOf(e);
  

    if (index >= 0) {
      this.imageArray = this.imageArray.filter(es => es != e);
      this.DataForm.splice(index,1)
    }
    console.log(this.DataForm)

  }
  createForm() {
    this.skillForm = this.fb.group({
      body: new FormControl("", Validators.required),
      photo: new FormControl(),
      servicetype: new FormControl("",Validators.required)
    })
  }
  get body() {
  return this.skillForm.get('body')
  }
  get servicetype() {
    return this.skillForm.get("servicetype")
  }
}
