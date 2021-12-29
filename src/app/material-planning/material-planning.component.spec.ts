import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPlanningComponent } from './material-planning.component';

describe('MaterialPlanningComponent', () => {
  let component: MaterialPlanningComponent;
  let fixture: ComponentFixture<MaterialPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialPlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
