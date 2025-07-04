import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerDataComponent } from './payer-data.component';

describe('PayerDataComponent', () => {
  let component: PayerDataComponent;
  let fixture: ComponentFixture<PayerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayerDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
