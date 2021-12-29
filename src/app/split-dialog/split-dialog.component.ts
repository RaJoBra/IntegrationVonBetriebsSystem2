import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-split-dialog',
  templateUrl: './split-dialog.component.html',
  styleUrls: ['./split-dialog.component.css']
})
export class SplitDialogComponent implements OnInit {
  articleId: number;
  initialAmount: number;
  oldOrderAmount: number;
  newOrderAmount: number = 0;

  constructor(public dialogRef: MatDialogRef<SplitDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.articleId = this.data.articleId;
    this.initialAmount = this.data.amount;
    this.oldOrderAmount = this.data.amount;

  }

  // Updates the quantity of both orders to dynamically display the quantity of both orders;
  updateAmount() {
    this.oldOrderAmount = this.initialAmount - this.newOrderAmount;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
