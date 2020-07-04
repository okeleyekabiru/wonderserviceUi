import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../app/interfaces/app-state';
import { HttpService } from '../../../app/services/http/http.service';
import { Router } from '@angular/router';
import { Lightbox, IAlbum } from 'ngx-lightbox';
import { UserService } from '../../../app/services/user/user.service';
import { IRenderedService } from '../../../app/interfaces/IRenderServices';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent extends BasePageComponent implements OnInit {
  private _albums: any[] = [];
 post:IRenderedService[]

  constructor(store: Store<IAppState>,
    httpSv: HttpService,public router:Router,private _lightbox: Lightbox,private userService:UserService) {
    super(store, httpSv, router);
   
  }

  ngOnInit() {
    this.userService.loadRenderedservice().subscribe({
      next: data => {
        this.post = data
      this.setLoaded()
      }, error: er => {
        console.log(er)
      }
    })

  }
  
  activate() {
      
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
      console.log(this._albums)
    })
    this._lightbox.open(this._albums, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}


