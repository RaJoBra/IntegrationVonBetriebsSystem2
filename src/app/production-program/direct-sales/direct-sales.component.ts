import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { DirectSales } from 'src/app/models/directSales';
import { ProdPlanToolService } from 'src/app/prod-plan-tool.service';
import { ProductionProgramPeriodNComponent } from '../production-program-period-n/production-program-period-n.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Order } from 'src/app/models/order';

export interface ProductionProgramElement {
  product: string;
  quantity: number;
  price: number;
  penalty: number;
}

const ELEMENT_DATA: ProductionProgramElement[] = [
  {product: 'P1', quantity: 0, price: 0, penalty: 0},
  {product: 'P2', quantity: 0, price: 0, penalty: 0},
  {product: 'P3', quantity: 0, price: 0, penalty: 0},
];

@Component({
  selector: 'app-direct-sales',
  templateUrl: './direct-sales.component.html',
  styleUrls: ['./direct-sales.component.css', '../../app.component.css'],
})
export class DirectSalesComponent implements OnInit {
  displayedColumns: string[] = ['product', 'quantity', 'price', 'penalty'];
  dataSource = ELEMENT_DATA;

  directSales: DirectSales[];

  quantity1: number;
  quantity2: number;
  quantity3: number;

  price1: number;
  price2: number;
  price3: number;

  penalty1: number;
  penalty2: number;
  penalty3: number;

  orders: Order[];

  constructor(
    private prodPlanToolService: ProdPlanToolService,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.GetAndSetData();
  }

  GetAndSetData() {
    this.prodPlanToolService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.prodPlanToolService.getDirectSales().subscribe((directSales) => {
        this.directSales = directSales;
        this.updateValues();
      });
    })
  }

  deleteOrder(id: number) {
    this.prodPlanToolService.deleteOrder(id).subscribe();
  }

  deleteAdditionalOrders() {
    this.orders.forEach(order => {
      if(order.id > 56) {
        this.deleteOrder(order.id);
      }
    })
  }

  updateValues() {
    this.quantity1 = this.directSales[0].quantity1;
    this.quantity2 = this.directSales[0].quantity2;
    this.quantity3 = this.directSales[0].quantity3;

    this.price1 = this.directSales[0].price1;
    this.price2 = this.directSales[0].price2;
    this.price3 = this.directSales[0].price3;

    this.penalty1 = this.directSales[0].penalty1;
    this.penalty2 = this.directSales[0].penalty2;
    this.penalty3 = this.directSales[0].penalty3;
  }

  updateDirectSale(directSale: DirectSales) {
    // Instanciates an objekt of the component that realizes the next period.
    let productionProgramPeriodNComponent = new ProductionProgramPeriodNComponent(
      this.prodPlanToolService,
      this._snackBar,
      this.translate,
      this.spinner
    );
    this.prodPlanToolService.updateDirectSale(directSale).subscribe((res) => {
      this.GetAndSetData();
      // Calls the getAndSetData-function for the next period to render the changes made in this component.
      productionProgramPeriodNComponent.GetAndSetData();
    });
  }

  updateDirectSaleInDatabase(row) {
    this.deleteAdditionalOrders();
    // Checks what articles safety stock has been changed.
    if (row.product === 'P1') {
      this.quantity1 = parseInt(row.quantity);
      this.price1 = parseFloat(row.price);
      this.penalty1 = parseFloat(row.penalty);
    }
    if (row.product === 'P2') {
      this.quantity2 = parseInt(row.quantity);
      this.price2 = parseFloat(row.price);
      this.penalty2 = parseFloat(row.penalty);
    }
    if (row.product === 'P3') {
      this.quantity3 = parseInt(row.quantity);
      this.price3 = parseFloat(row.price);
      this.penalty3 = parseFloat(row.penalty);
    }

    const directSale = {
      id: this.directSales[0].id,
      quantity1: this.quantity1,
      quantity2: this.quantity2,
      quantity3: this.quantity3,
      price1: this.price1,
      price2: this.price2,
      price3: this.price3,
      penalty1: this.penalty1,
      penalty2: this.penalty2,
      penalty3: this.penalty3,
    };

    this.updateDirectSale(directSale);
  }
}
