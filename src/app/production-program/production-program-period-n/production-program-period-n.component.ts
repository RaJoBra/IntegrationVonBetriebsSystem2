import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Forecast } from 'src/app/models/forecast';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Queue } from 'src/app/models/queue';
import { ProdPlanToolService } from 'src/app/prod-plan-tool.service';
import { TranslateService } from '@ngx-translate/core';
import { ProductionProgramPeriodN1Component } from '../production-program-period-n+1/production-program-period-n1.component';
import { DirectSales } from 'src/app/models/directSales';
import { NgxSpinnerService } from 'ngx-spinner';
import { Order } from 'src/app/models/order';
import { subscribeOn } from 'rxjs/operators';
import { ProcessNavbarComponent } from '../../process-navbar/process-navbar.component';

export interface ProductionProgramElement {
  product: string;
  sellwish: number; // Verbindliche Aufträge / Vertriebswunsch
  warehousestock: number; // Lagerbestand am Ende der Vorperiode
  pssn1: number; // Geplanter Lagerbestand am Ende der Planperiode (Sicherheitsbestand)
  production: number; // Produktionsaufträge für die kommende Periode
}

const ELEMENT_DATA: ProductionProgramElement[] = [
  { product: 'P1', sellwish: 0, warehousestock: 0, pssn1: 0, production: 0 },
  { product: 'P2', sellwish: 0, warehousestock: 0, pssn1: 0, production: 0 },
  { product: 'P3', sellwish: 0, warehousestock: 0, pssn1: 0, production: 0 },
];

@Component({
  selector: 'app-production-program-period-n',
  templateUrl: './production-program-period-n.component.html',
  styleUrls: [
    './production-program-period-n.component.css',
    '../../app.component.css',
  ],
})

// Period n
export class ProductionProgramPeriodNComponent implements OnInit {
  displayedColumns: string[] = [
    'product',
    'sellwish',
    'warehousestock',
    'pssn1',
    'production',
  ];
  dataSource = ELEMENT_DATA;

  forecasts: Forecast[];
  articles: Article[];
  queues: Queue[];
  directSales: DirectSales[];
  orders: Order[];

  p1inQueue: Queue;
  p2inQueue: Queue;
  p3inQueue: Queue;
  p1inWork: Queue;
  p2inWork: Queue;
  p3inWork: Queue;
  p1CheckQueue: number;
  p2CheckQueue: number;
  p3CheckQueue: number;

  pss1: number;
  pss2: number;
  pss3: number;

  constructor(
    private prodPlanToolService: ProdPlanToolService,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show().then(() => {
      this.GetAndSetData();
    });
  }

  // Gets the data from the database and updates the local data.
  GetAndSetData() {
    // getOrders
    this.prodPlanToolService.getOrders().subscribe(orders => {
      this.orders = orders;
      // getForecast
      this.prodPlanToolService.getForecasts().subscribe((forecasts) => {
        this.forecasts = forecasts;
        // getArticles
        this.prodPlanToolService.getArticles().subscribe((articles) => {
          this.articles = articles;
          // getQueues
          this.prodPlanToolService.getQueues().subscribe((queues) => {
            this.queues = queues;
            // getDirectSales
            this.prodPlanToolService.getDirectSales().subscribe((directSales) => {
              this.directSales = directSales;
              console.log(directSales);
              this.updatePlannedSafetyStock();
              this.updateDataSource();
              //this.checkForNegativeProductionValues();
              this.spinner.hide();
            });
          });
        });
      });
    });
  }

  // Updates the planned safety stock of the forecast
  updatePlannedSafetyStock() {
    this.pss1 = this.forecasts[0].pss1;
    this.pss2 = this.forecasts[0].pss2;
    this.pss3 = this.forecasts[0].pss3;
  }

  // Updates a given forecast in the database depending on the id.
  updateForecast(forecast: Forecast) {
    // Instanciates an objekt of the component that realizes the next period.
    let productionProgramPeriodN1Component =
      new ProductionProgramPeriodN1Component(
        this.prodPlanToolService,
        this._snackBar,
        this.translate
      );
    this.prodPlanToolService.updateForecast(forecast).subscribe((res) => {
      this.GetAndSetData();
      // Calls the getAndSetData-function for the next period to render the changes made in this component.
      productionProgramPeriodN1Component.GetAndSetData();
    });
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

  // Updates the value for pss1, pss2 for pss3 in the database depending on the article the safety stock has been changed for.
  updateProduction(row) {
    this.deleteAdditionalOrders();
    // Checks what articles safety stock has been changed.
    if (row.product === 'P1') {
      this.pss1 = parseInt(row.pssn1);
    }
    if (row.product === 'P2') {
      this.pss2 = parseInt(row.pssn1);
    }
    if (row.product === 'P3') {
      this.pss3 = parseInt(row.pssn1);
    }

    // Forecasts[0] is the forecast for the period n.
    const forecast = {
      id: this.forecasts[0].id,
      period: this.forecasts[0].period,
      article1: this.forecasts[0].article1,
      article2: this.forecasts[0].article2,
      article3: this.forecasts[0].article3,
      pss1: this.pss1,
      pss2: this.pss2,
      pss3: this.pss3,
    };

    this.updateForecast(forecast);

    ProcessNavbarComponent.manufacturingSequence = false;
    ProcessNavbarComponent.capacityPlanning = false;
    ProcessNavbarComponent.materialPlanning = false;
    ProcessNavbarComponent.export = false;
  }

  // Checks wether there is a queue or work in progress.
  checkQueue(inQueue: Queue, inWork: Queue) {
    // Checks wether the value is 0.
    if (inQueue == null || inWork == null) return 0;
    if (inQueue == null && inWork != null) return inQueue.amount;
    if (inQueue != null && inWork == null) return inWork.amount;
    return inWork.amount + inQueue.amount;
  }

  // Checks for negative production values.
  // If found opens a snackbar message.
  checkForNegativeProductionValues() {
    if (this.dataSource.find((tableElement) => tableElement.production < 0)) {
      this.translate
        .get('manufacturingSequence.checkForNegativeProductionValues')
        .subscribe((message: string) => {
          this.translate.get('close').subscribe((action: string) => {
            this._snackBar.open(message, action);
          });
        });
    }
  }

  // Updates the datasource with the incoming data from the database.
  updateDataSource() {
    // Sellwish
    this.dataSource[0].sellwish =
      this.forecasts[0].article1 + this.directSales[0].quantity1;
    this.dataSource[1].sellwish =
      this.forecasts[0].article2 + this.directSales[0].quantity2;
    this.dataSource[2].sellwish =
      this.forecasts[0].article3 + this.directSales[0].quantity3;

    // Warehouse Stock
    this.dataSource[0].warehousestock = this.articles[0].amount;
    this.dataSource[1].warehousestock = this.articles[1].amount;
    this.dataSource[2].warehousestock = this.articles[2].amount;

    // Production
    this.p1inQueue = this.queues.find(
      (queue) => queue.article === 1 && queue.inwork === false
    );
    this.p2inQueue = this.queues.find(
      (queue) => queue.article === 2 && queue.inwork === false
    );
    this.p3inQueue = this.queues.find(
      (queue) => queue.article === 3 && queue.inwork === false
    );

    this.p1inWork = this.queues.find(
      (queue) => queue.article === 1 && queue.inwork === true
    );
    this.p2inWork = this.queues.find(
      (queue) => queue.article === 2 && queue.inwork === true
    );
    this.p3inWork = this.queues.find(
      (queue) => queue.article === 3 && queue.inwork === true
    );

    this.p1CheckQueue = this.checkQueue(this.p1inQueue, this.p1inWork);
    this.p2CheckQueue = this.checkQueue(this.p2inQueue, this.p2inWork);
    this.p3CheckQueue = this.checkQueue(this.p3inQueue, this.p3inWork);

    this.dataSource[0].production =
      this.forecasts[0].article1 +
      this.directSales[0].quantity1 +
      this.pss1 -
      this.articles[0].amount -
      this.p1CheckQueue;
    this.dataSource[1].production =
      this.forecasts[0].article2 +
      this.directSales[0].quantity2 +
      this.pss2 -
      this.articles[1].amount -
      this.p2CheckQueue;
    this.dataSource[2].production =
      this.forecasts[0].article3 +
      this.directSales[0].quantity3 +
      this.pss3 -
      this.articles[2].amount -
      this.p3CheckQueue;
  }

  checkRouteToDisposition() {
    return this.dataSource.some(
      (prodProgram) =>
        prodProgram.production < 0
    );
  }
}
