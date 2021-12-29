import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingSequenceComponent } from './manufacturing-sequence.component';

describe('ManufacturingSequenceComponent', () => {
  let component: ManufacturingSequenceComponent;
  let fixture: ComponentFixture<ManufacturingSequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturingSequenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturingSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
