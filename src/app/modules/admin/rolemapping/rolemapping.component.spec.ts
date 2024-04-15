import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolemappingComponent } from './rolemapping.component';

describe('RolemappingComponent', () => {
  let component: RolemappingComponent;
  let fixture: ComponentFixture<RolemappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RolemappingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolemappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
