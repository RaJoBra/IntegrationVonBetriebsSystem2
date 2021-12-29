import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDialogComponent } from './navbar-dialog.component';

describe('NavbarDialogComponent', () => {
  let component: NavbarDialogComponent;
  let fixture: ComponentFixture<NavbarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
