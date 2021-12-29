import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  type: string;
}

@Component({
  selector: 'app-file-upload-dialog-types',
  templateUrl: './file-upload-dialog-types.component.html',
  styleUrls: ['./file-upload-dialog-types.component.css'],
})
export class FileUploadDialogTypesComponent implements OnInit {
  type: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {}
}
