import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalemployeecountComponent } from './totalemployeecount.component';

describe('TotalemployeecountComponent', () => {
  let component: TotalemployeecountComponent;
  let fixture: ComponentFixture<TotalemployeecountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalemployeecountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalemployeecountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
