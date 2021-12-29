import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionProgramPeriodN1Component } from './production-program-period-n1.component';

describe('ProductionProgramPeriodN1Component', () => {
  let component: ProductionProgramPeriodN1Component;
  let fixture: ComponentFixture<ProductionProgramPeriodN1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionProgramPeriodN1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionProgramPeriodN1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
