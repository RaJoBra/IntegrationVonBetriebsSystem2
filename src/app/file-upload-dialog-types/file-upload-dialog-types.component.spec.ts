import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadDialogTypesComponent } from './file-upload-dialog-types.component';

describe('FileUploadDialogTypesComponent', () => {
  let component: FileUploadDialogTypesComponent;
  let fixture: ComponentFixture<FileUploadDialogTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadDialogTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadDialogTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
