import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleappontmentComponent } from './scheduleappontment.component';

describe('ScheduleappontmentComponent', () => {
  let component: ScheduleappontmentComponent;
  let fixture: ComponentFixture<ScheduleappontmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleappontmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleappontmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
