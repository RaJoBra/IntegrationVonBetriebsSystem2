import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionProgramPeriodN3Component } from './production-program-period-n3.component';

describe('ProductionProgramPeriodN3Component', () => {
  let component: ProductionProgramPeriodN3Component;
  let fixture: ComponentFixture<ProductionProgramPeriodN3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionProgramPeriodN3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionProgramPeriodN3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
