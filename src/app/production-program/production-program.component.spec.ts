import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionProgramComponent } from './production-program.component';

describe('ProductionProgramComponent', () => {
  let component: ProductionProgramComponent;
  let fixture: ComponentFixture<ProductionProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
