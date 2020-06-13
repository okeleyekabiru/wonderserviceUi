import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmrcontactComponent } from './cmrcontact.component';

describe('CmrcontactComponent', () => {
  let component: CmrcontactComponent;
  let fixture: ComponentFixture<CmrcontactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmrcontactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmrcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
