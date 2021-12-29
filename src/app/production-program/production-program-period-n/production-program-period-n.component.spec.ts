import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionProgramPeriodNComponent } from './production-program-period-n.component';

describe('ProductionProgramPeriodNComponent', () => {
  let component: ProductionProgramPeriodNComponent;
  let fixture: ComponentFixture<ProductionProgramPeriodNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionProgramPeriodNComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionProgramPeriodNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
