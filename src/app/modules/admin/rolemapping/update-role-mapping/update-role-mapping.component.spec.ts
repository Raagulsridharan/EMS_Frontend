import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRoleMappingComponent } from './update-role-mapping.component';

describe('UpdateRoleMappingComponent', () => {
  let component: UpdateRoleMappingComponent;
  let fixture: ComponentFixture<UpdateRoleMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateRoleMappingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateRoleMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
