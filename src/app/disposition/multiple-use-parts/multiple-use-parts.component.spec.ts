import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleUsePartsComponent } from './multiple-use-parts.component';

describe('MultipleUsePartsComponent', () => {
  let component: MultipleUsePartsComponent;
  let fixture: ComponentFixture<MultipleUsePartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleUsePartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleUsePartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
