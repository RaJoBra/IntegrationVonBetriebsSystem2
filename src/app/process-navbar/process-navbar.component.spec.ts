import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessNavbarComponent } from './process-navbar.component';

describe('ProcessNavbarComponent', () => {
  let component: ProcessNavbarComponent;
  let fixture: ComponentFixture<ProcessNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
