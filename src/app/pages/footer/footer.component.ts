import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponents implements OnInit {


  data :any[]
  constructor() { }
year= new Date().getFullYear()
  ngOnInit() {
  }

}
