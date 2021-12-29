import { Component, OnInit } from '@angular/core';
import { NavbarDialogComponent } from '../navbar-dialog/navbar-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProdPlanToolService } from '../prod-plan-tool.service';
import { Forecast } from '../models/forecast';
import { Article } from '../models/article';
import { Order } from '../models/order';
import { Capacity } from '../models/capacity';
import { Purchase } from '../models/purchase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {ProductionProgramPeriodN1Component} from '../production-program/production-program-period-n+1/production-program-period-n1.component';
import {ProductionProgramPeriodN2Component} from '../production-program/production-program-period-n+2/production-program-period-n2.component';
import {ProductionProgramPeriodN3Component} from '../production-program/production-program-period-n+3/production-program-period-n3.component';

@Component({
  selector: 'app-process-navbar',
  templateUrl: './process-navbar.component.html',
  styleUrls: ['./process-navbar.component.css'],
})
export class ProcessNavbarComponent implements OnInit {
  static productionProgram = false;
  static disposition = false;
  static manufacturingSequence = false;
  static capacityPlanning = false;
  static materialPlanning = false;
  static export = false;
  static progress = false;

  forecasts: Forecast[];
  articles: Article[];
  orders: Order[];
  capacities: Capacity[];
  purchases: Purchase[];

  constructor(
    private prodPlanToolService: ProdPlanToolService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
  ) {}

  getProductionProgram() {
    return ProcessNavbarComponent.productionProgram;
  }

  getDisposition() {
    return ProcessNavbarComponent.disposition;
  }

  getManufacturingSequence() {
    return ProcessNavbarComponent.manufacturingSequence;
  }

  getCapacityPlanning() {
    return ProcessNavbarComponent.capacityPlanning;
  }

  getMaterialPlanning() {
    return ProcessNavbarComponent.materialPlanning;
  }

  getExport() {
    return ProcessNavbarComponent.export;
  }

  checkRouteToDisposition() {
    let productionProgramPeriodN1Component = new ProductionProgramPeriodN1Component(
      this.prodPlanToolService,
      this._snackBar,
      this.translate
    );
    let productionProgramPeriodN2Component = new ProductionProgramPeriodN2Component(
      this.prodPlanToolService,
      this._snackBar,
      this.translate
    );
    let productionProgramPeriodN3Component = new ProductionProgramPeriodN3Component(
      this.prodPlanToolService,
      this._snackBar,
      this.translate
    );
    const negativeN1 = productionProgramPeriodN1Component.checkRouteToDisposition();
    const negativeN2 = productionProgramPeriodN2Component.checkRouteToDisposition();
    const negativeN3 = productionProgramPeriodN3Component.checkRouteToDisposition();
    if (negativeN1 || negativeN2 || negativeN3) {
      this.openDialog();
    } else {
      this.router.navigate(['/disposition']);
    }
  }

  checkRouteToManufacturingSequence() {
    this.prodPlanToolService.getArticles().subscribe((articles) => {
      this.articles = articles;
      this.prodPlanToolService.getOrders().subscribe((orders) => {
        this.orders = orders;
        const negativeOrders = this.orders.some((order) => order.amount < 0);
        if (negativeOrders) {
          this.openDialog();
        } else {
          this.router.navigate(['/manufacturing-sequence']);
        }
      });
    });
  }

  checkRouteToCapacityPlanning() {
    this.prodPlanToolService.getOrders().subscribe((orders) => {
      this.orders = orders;
      const negativeOrders = this.orders.some((order) => order.amount < 0);
      if (negativeOrders) {
        this.openDialog();
      } else {
        this.router.navigate(['/capacity-planning']);
      }
    });
  }

  checkRouteToMaterialPlanning() {
    this.prodPlanToolService.getCapacities().subscribe((capacities) => {
      this.capacities = capacities;
      const negativeCapacities = this.capacities.some(
        (capacity) =>
          capacity.shift < 0 ||
          capacity.overtime < 0 ||
          capacity.capacity < 0 ||
          capacity.buffer < 0
      );
      if (negativeCapacities) {
        this.openDialog();
      } else {
        this.router.navigate(['/material-planning']);
      }
    });
  }

  checkRouteToFileDownload() {
    this.prodPlanToolService.getPurchases().subscribe((purchases) => {
      this.purchases = purchases;
      const negativePurchases = this.purchases.some(
        (purchase) => purchase.amount < 0
      );
      if (negativePurchases) {
        this.openDialog();
      } else {
        this.router.navigate(['/file-download']);
      }
    });
  }

  // Opens a dialog to reset the progress
  openDialog() {
    const dialogRef = this.dialog.open(NavbarDialogComponent);
    dialogRef.afterClosed();
  }

  ngOnInit(): void {}
}
