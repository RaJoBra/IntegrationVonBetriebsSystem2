import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositionP1Component } from './disposition-p1.component';

describe('DispositionP1Component', () => {
  let component: DispositionP1Component;
  let fixture: ComponentFixture<DispositionP1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispositionP1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositionP1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
