import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveassignComponent } from './leaveassign.component';

describe('LeaveassignComponent', () => {
  let component: LeaveassignComponent;
  let fixture: ComponentFixture<LeaveassignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveassignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
