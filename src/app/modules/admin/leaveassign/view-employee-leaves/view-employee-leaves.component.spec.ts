import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployeeLeavesComponent } from './view-employee-leaves.component';

describe('ViewEmployeeLeavesComponent', () => {
  let component: ViewEmployeeLeavesComponent;
  let fixture: ComponentFixture<ViewEmployeeLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewEmployeeLeavesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewEmployeeLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
