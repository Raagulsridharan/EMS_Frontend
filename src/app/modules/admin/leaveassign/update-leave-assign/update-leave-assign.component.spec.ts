import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLeaveAssignComponent } from './update-leave-assign.component';

describe('UpdateLeaveAssignComponent', () => {
  let component: UpdateLeaveAssignComponent;
  let fixture: ComponentFixture<UpdateLeaveAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateLeaveAssignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateLeaveAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
