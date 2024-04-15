import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedLeavesComponent } from './requested-leaves.component';

describe('RequestedLeavesComponent', () => {
  let component: RequestedLeavesComponent;
  let fixture: ComponentFixture<RequestedLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestedLeavesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestedLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
