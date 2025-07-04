import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarVectorComponent } from './sidebar-vector.component';

describe('SidebarVectorComponent', () => {
  let component: SidebarVectorComponent;
  let fixture: ComponentFixture<SidebarVectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarVectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarVectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
