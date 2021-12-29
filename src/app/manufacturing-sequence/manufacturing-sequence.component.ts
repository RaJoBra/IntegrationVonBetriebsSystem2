import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from '../models/order'
import { ProdPlanToolService } from '../prod-plan-tool.service';
import { SplitDialogComponent } from '../split-dialog/split-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { ProcessNavbarComponent } from '../process-navbar/process-navbar.component';

@Component({
  selector: 'app-manufacturing-sequence',
  templateUrl: './manufacturing-sequence.component.html',
  styleUrls: ['./manufacturing-sequence.component.css']
})
export class ManufacturingSequenceComponent implements OnInit {
  displayedColumns: string[] = ['article', 'amount', 'split', 'delete'];
  dataSource: Order[] = [];

  constructor(
    private productionPlanningToolService: ProdPlanToolService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private translate: TranslateService) {
      ProcessNavbarComponent.capacityPlanning = true;
  }

  ngOnInit(): void {
    this.getOrders();
  }

  // Gets all orders from the database.
  getOrders() {
    this.productionPlanningToolService.getOrders().subscribe(orders => {
      orders.sort((a,b) => (a.priority > b.priority) ? 1 : -1);
      this.dataSource = orders;
      this.checkForNegativeProductionValues();
    });
  }

  // Adds an order to the database.
  addOrder(order: Order) {
    this.productionPlanningToolService.addOrder(order).subscribe(res => this.getOrders());
  }

  // Updates an order in the database.
  updateOrder(order: Order) {
    this.productionPlanningToolService.updateOrder(order).subscribe(res => console.log(this.dataSource));
  }

  // Deletes an order in the database.
  deleteOrder(element) {
    this.productionPlanningToolService.getOrder(element.article).subscribe(order => {
      order.amount += element.amount;
      this.productionPlanningToolService.updateOrder(order).subscribe(res => {
        this.productionPlanningToolService.deleteOrder(element.id).subscribe(res => this.getOrders());
      });
    });
  }

  // Updates the priorities of the orders after rearranging.
  updatePriorities(orders: Order[]) {
    orders.forEach(order => {
      order.priority = (orders.indexOf(order) + 1);
      this.updateOrder(order);
    })
  }

  // Triggered by drag and dropping an element.
  drop(event: CdkDragDrop<Order[]>) {
    // Swap the elements around in the array.
    moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);
    // Update the local dataSource.
    this.dataSource = [...this.dataSource]
    this.updatePriorities(this.dataSource);
  }

  // After splitting an order update the old order and add the new one.
  updateOrdersAfterSplitting(oldOrderId: number, articleId: number, oldOrderInitialAmount: number, newOrderAmount: number, oldOrderPriority: number) {
    // Stops the creation of orders with amount 0
    if (newOrderAmount === 0 || newOrderAmount === undefined) {
      return;
    }

    // Update the old order with new data from the dialog.
    let oldOrder: Order = {
      id: oldOrderId,
      article: articleId,
      amount: oldOrderInitialAmount - newOrderAmount,
      priority: oldOrderPriority,
      stockvalue: 0
    };
    // Update old order in database.
    this.updateOrder(oldOrder);

    // Create a new order with the data passed from the dialog.
    let newOrder: Order = {
      id: (Math.max.apply(Math, this.dataSource.map(function(order) { return order.id; }))) + 1,
      article: articleId,
      amount: newOrderAmount,
      priority: (Math.max.apply(Math, this.dataSource.map(function(order) { return order.priority; }))) + 1,
      stockvalue: 0
    };
    // Add new order to database.
    this.addOrder(newOrder);
  }

  // Opens the dialog for splitting an order.
  openDialog(row: any) {
    const dialogRef = this.dialog.open(SplitDialogComponent, {
      // Data which is passed to the dialog component.
      data: {
        orderId: row.id,
        articleId: row.article,
        amount: row.amount,
      }
    });
    dialogRef.afterClosed().subscribe(newOrderAmount => {
      this.updateOrdersAfterSplitting(row.id, row.article, row.amount, newOrderAmount, row.priority);
      console.log(newOrderAmount);
    });
  }

  // Checks for negative production values.
  // If found opens a snackbar message.
  checkForNegativeProductionValues() {
    if(this.dataSource.find(order => order.amount < 0)) {
      this.translate.get('manufacturingSequence.checkForNegativeProductionValues').subscribe((message: string) => {
        this.translate.get('close').subscribe((action: string) => {
          this._snackBar.open(message, action);
        })
      })
    }
  }
}
