import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPlanningTableComponent } from './material-planning-table.component';

describe('MaterialPlanningTableComponent', () => {
  let component: MaterialPlanningTableComponent;
  let fixture: ComponentFixture<MaterialPlanningTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialPlanningTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialPlanningTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
