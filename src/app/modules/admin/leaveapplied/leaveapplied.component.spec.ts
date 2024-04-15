import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveappliedComponent } from './leaveapplied.component';

describe('LeaveappliedComponent', () => {
  let component: LeaveappliedComponent;
  let fixture: ComponentFixture<LeaveappliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveappliedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveappliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
