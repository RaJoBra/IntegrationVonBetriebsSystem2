import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionProgramPeriodN2Component } from './production-program-period-n2.component';

describe('ProductionProgramPeriodN2Component', () => {
  let component: ProductionProgramPeriodN2Component;
  let fixture: ComponentFixture<ProductionProgramPeriodN2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionProgramPeriodN2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionProgramPeriodN2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
