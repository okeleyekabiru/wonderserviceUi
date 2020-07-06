import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../app/interfaces/app-state';
import { HttpService } from '../../../app/services/http/http.service';
import { Router } from '@angular/router';
import { Lightbox, IAlbum } from 'ngx-lightbox';
import { UserService } from '../../../app/services/user/user.service';
import { IRenderedService } from '../../../app/interfaces/IRenderServices';
import { AuthService } from '../../../app/services/auth/auth.service';
import * as decode from 'jwt-decode';
import { TCModalService } from '../../../app/ui/services/modal/modal.service';
import { Content } from '../../../app/ui/interfaces/modal';
import { Form } from '@angular/forms';
import { AdminService } from '../../../app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent extends BasePageComponent implements OnInit {
  private _albums: any[] = [];
 post:IRenderedService[]
  isAdmin: boolean = false
  id:string
  constructor(store: Store<IAppState>,
    httpSv: HttpService,public router:Router,private _lightbox: Lightbox,private userService:UserService,private toastr:ToastrService,private adminService:AdminService,private auth:AuthService, private modal: TCModalService,) {
    super(store, httpSv, router);
   
  }

  ngOnInit() {
    this.activate()
    this.userService.loadRenderedservice().subscribe({
      next: data => {
        this.post = data
      this.setLoaded()
      }, error: er => {
        console.log(er)
      }
    })

  }
  getResult(e: FormData) {
    e.append("id", this.id)
    this.adminService.updateRenderService(e).subscribe({
      next: d => {
        this.toastr.success("post update successfully", "Post")
     
        this.closeModal();
      },
      error: err => {
        this.toastr.error("An error occured while post","Post")
      }
    })
  }
  delete(id) {
    this.adminService.deletePost(id).subscribe({
      next: d => {
        this.toastr.success("Post successfully deleted")
        this.userService.loadRenderedservice().subscribe({
          next: data => {
            this.post = data
          this.setLoaded()
          }, error: er => {
            console.log(er)
          }
        })
      }
    })
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
  getValue(e: boolean) {
    if (e) {
      this.closeModal()
    }
  }
  getId(id) {
    console.log(id)
    this.id = id
  }
  activate() {
    let tokenPayload;
    const token = this.auth.getFromLocalSorage();
    if (token != undefined || token != null) {
      tokenPayload = decode(token);
    }
    if (this.auth.isUserLoggedIn() && tokenPayload.role == "Admin") {
      this.isAdmin = true
    }
    }
  
  images: IAlbum[] 
  image: IAlbum  
  
  
  open(index: number,first:number): void {
    // open lightbox
    var newImage = this.post[first]
    newImage.photos.forEach(e => {
      let album = {
        src: e.url,
        thumb: e.url
      };
      this._albums.push(album);

    })
    this._lightbox.open(this._albums, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}


