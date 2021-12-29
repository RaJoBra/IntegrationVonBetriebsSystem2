import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositionP2Component } from './disposition-p2.component';

describe('DispositionP2Component', () => {
  let component: DispositionP2Component;
  let fixture: ComponentFixture<DispositionP2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispositionP2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositionP2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
