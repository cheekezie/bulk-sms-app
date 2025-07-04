import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeSelectComponent } from './fee-select.component';

describe('FeeSelectComponent', () => {
  let component: FeeSelectComponent;
  let fixture: ComponentFixture<FeeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
