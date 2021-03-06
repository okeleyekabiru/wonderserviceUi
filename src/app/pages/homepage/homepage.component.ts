import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from '../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../app/interfaces/app-state';
import { HttpService } from '../../../app/services/http/http.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TCModalService } from '../../../app/ui/services/modal/modal.service';
import { Content } from '../../ui/interfaces/modal';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent extends BasePageComponent implements OnInit,OnDestroy {

  constructor(store: Store<IAppState>,
    httpSv: HttpService,public router:Router,  private modal: TCModalService,private toastr:ToastrService) {
    super(store, httpSv, router);
    
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

  hompageAnimation() {

    // $('.animation-element').removeClass('in-view');
    
    var $animation_elements = $('.product-row > div');
    var $window = $(window);
    
    function check_if_in_view() {
      var window_height = $window.height();
      var window_top_position = $window.scrollTop();
      var window_bottom_position = (window_top_position + window_height);
     
      $.each($animation_elements, function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
     
        
        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
          $element.addClass('in-view');
        } else {
          // $element.removeClass('in-view');
        }
      });
    }
    
    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');
}
  ngOnInit() {
    this.hompageAnimation()
    this.setLoaded()
    this.PreventReload();
  }
  ngOnDestroy()
  {
    super.ngOnDestroy()
}
}
