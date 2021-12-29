import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositionP3Component } from './disposition-p3.component';

describe('DispositionP3Component', () => {
  let component: DispositionP3Component;
  let fixture: ComponentFixture<DispositionP3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispositionP3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositionP3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
