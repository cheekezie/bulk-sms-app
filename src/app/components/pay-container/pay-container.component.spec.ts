import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayContainerComponent } from './pay-container.component';

describe('PayContainerComponent', () => {
  let component: PayContainerComponent;
  let fixture: ComponentFixture<PayContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
