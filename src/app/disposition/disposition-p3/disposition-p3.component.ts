import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Article } from 'src/app/models/article';
import { DirectSales } from 'src/app/models/directSales';
import { Forecast } from 'src/app/models/forecast';
import { Order } from 'src/app/models/order';
import { Queue } from 'src/app/models/queue';
import { ProdPlanToolService } from 'src/app/prod-plan-tool.service';
import { MultipleUsePartsComponent } from '../multiple-use-parts/multiple-use-parts.component';

export interface ProductionProgramElement {
  partId: number;
  salesorders: number;
  additionalparts: number; //Additional Parts to be produced for the Queue
  PWS: number; //Planned Warehouse Stock
  CWS: number; //Current Warehouse Stock
  OiWQ: number; //Orders in Waiting Queue
  workinprogress: number;
  production: number; // Parts (amount) that have to be produced
  additionalwarehousestock: number; //Additional Planned Warehouse Stock
}

const ELEMENT_DATA: ProductionProgramElement[] = [
  {partId: 3, salesorders: 0, additionalparts: 0, PWS: 0, CWS: 0, OiWQ: 0, workinprogress: 0, additionalwarehousestock: 0, production: 0},
  {partId: 31, salesorders: 0, additionalparts: 0, PWS: 0, CWS: 0, OiWQ: 0, workinprogress: 0, additionalwarehousestock: 0, production: 0},
  {partId: 30, salesorders: 0, additionalparts: 0, PWS: 0, CWS: 0, OiWQ: 0, workinprogress: 0, additionalwarehousestock: 0, production: 0},
  {partId: 6, salesorders: 0, additionalparts: 0, PWS: 0, CWS: 0, OiWQ: 0, workinprogress: 0, additionalwarehousestock: 0, production: 0},
  {partId: 12, salesorders: 0, additionalparts: 0, PWS: 0, CWS: 0, OiWQ: 0, workinprogress: 0, additionalwarehousestock: 0, production: 0},
  {partId: 29, salesorders: 0, additionalparts: 0, PWS: 0, CWS: 0, OiWQ: 0, workinprogress: 0, additionalwarehousestock: 0, production: 0},
  {partId: 9, salesorders: 0, additionalparts: 0, PWS: 0, CWS: 0, OiWQ: 0, workinprogress: 0, additionalwarehousestock: 0, production: 0},
  {partId: 15, salesorders: 0, additionalparts: 0, PWS: 0, CWS: 0, OiWQ: 0, workinprogress: 0, additionalwarehousestock: 0, production: 0},
  {partId: 20, salesorders: 0, additionalparts: 0, PWS: 0, CWS: 0, OiWQ: 0, workinprogress: 0, additionalwarehousestock: 0, production: 0},
];

@Component({
  selector: 'app-disposition-p3',
  templateUrl: './disposition-p3.component.html',
  styleUrls: ['./disposition-p3.component.css']
})

export class DispositionP3Component implements OnInit {
  displayedColumns: string[] = ['partId', 'salesorders', 'additionalparts', 'PWS', 'CWS', 'OiWQ', 'workinprogress', 'additionalwarehousestock', 'production']
  dataSource = ELEMENT_DATA;

  forecasts: Forecast[];
  articles: Article[];
  queues: Queue[];
  directSales: DirectSales[];
  orders: Order[];

  constructor(private prodPlanToolService: ProdPlanToolService, private _snackBar: MatSnackBar, private translate: TranslateService) { }

  ngOnInit() {
    this.getAndSetData();
  }

  // Gets the data from the database and updates the local data.
  getAndSetData() {
    // getForecast
    this.prodPlanToolService.getForecasts()
    .subscribe(forcasts => {
      this.forecasts = forcasts;
      // getArticles
      this.prodPlanToolService.getArticles()
      .subscribe(articles => {
        this.articles = articles;
        // getQueues
        this.prodPlanToolService.getQueues()
        .subscribe(queues => {
          this.queues = queues;
          // getDirectSales
          this.prodPlanToolService.getDirectSales()
          .subscribe(directSales => {
            this.directSales = directSales;
             // getOrders
            this.prodPlanToolService.getOrders()
            .subscribe(orders => {
              this.orders = orders;
              this.updateDataSource();
              this.updateOrdersInDatabase();
              this.deleteAdditionalOrders();
              this.checkForNegativeProductionValues();
            });
          })
        });
      });
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

  // Updates an article and then calls method getAndSetData().
  updateArticle(article: Article) {
    let multipleUsePartsComponent =
        new MultipleUsePartsComponent(
          this.prodPlanToolService,
          this._snackBar,
          this.translate
        );
    this.prodPlanToolService
      .updateArticle(article)
      .subscribe((res) => {
        this.getAndSetData();
        multipleUsePartsComponent.getAndSetData();
      });
  }

  // Updates AdditionalWarehouseStock for an article by id
  updateAdditionalWarehouseStock(element: any) {
    this.prodPlanToolService.getArticle(element.partId).subscribe(article => {
      article.additionalWarehouseStock = element.additionalwarehousestock;
      this.updateArticle(article);
    });
  }

  // Updates an order.
  updateOrder(order: Order) {
    this.prodPlanToolService.updateOrder(order).subscribe();
  }

  // Updates all orders in the database.
  updateOrdersInDatabase() {
    let number: number = 19
    for(let i = 0; i < this.dataSource.length; i++) {
       let order: Order = {
         id: this.dataSource[i].partId,
         article: this.dataSource[i].partId,
         amount: this.dataSource[i].production,
         priority: number,
         stockvalue: this.dataSource[i].CWS
       }
      this.updateOrder(order);
      number = number + 1;
      console.log(order);
    }
  }

  // Checks if Object of Queue is null.
  // If inQueue is null return 0
  // Else return amount of inQueue
  checkQueue(inQueue: Queue) {
    if(inQueue == null) return 0;
    return inQueue.amount;
  }

  // Checks for negative production values.
  // If found opens a snackbar message.
  checkForNegativeProductionValues() {
    if(this.dataSource.find(tableElement => tableElement.production < 0)) {
      this.translate.get('manufacturingSequence.checkForNegativeProductionValues').subscribe((message: string) => {
        this.translate.get('close').subscribe((action: string) => {
          this._snackBar.open(message, action);
        })
      })
    }
  }

  // Updates DataSource and calculates all necessary values.
  updateDataSource() {

    // P3
    this.dataSource[0].salesorders = this.forecasts[0].article3 + this.directSales[0].quantity3; // Sales Orders = Forecast from P3 + Direct Sales from P3
    this.dataSource[0].PWS = this.forecasts[0].pss3; // Planned Warehouse Stock
    this.dataSource[0].CWS = this.articles[2].amount; // Current Warehouse Stock
    this.dataSource[0].OiWQ = this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === false)); // Orders in Waiting Queue
    this.dataSource[0].workinprogress = this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === true)); // Work in Progress
    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[0].production =
      this.forecasts[0].article3 + this.directSales[0].quantity3 // Sales Orders = Forecast from P3 + Direct Sales from P3
      + this.forecasts[0].pss3 // Planned Warehouse Stock von P3
      + this.articles[2].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[2].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === true)); // Work in Progress

    // E31
    this.dataSource[1].salesorders = this.dataSource[0].production; // Sales Orders
    this.dataSource[1].additionalparts = this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === false)); // Additional Parts to be produced
    this.dataSource[1].PWS = this.forecasts[0].pss3; // Planned Warehouse Stock
    this.dataSource[1].CWS = this.articles[30].amount; // Current Warehouse Stock
    this.dataSource[1].OiWQ = this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === false)); // Orders in Waiting Queue
    this.dataSource[1].workinprogress = this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === true)); // Work in Progress
    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock + Additional Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[1].production =
      this.dataSource[0].production // Sales Order = Production from P3
      + this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === false)) // Additional Parts = Queue from P3
      + this.forecasts[0].pss3 // Planned Warehouse Stock von P3
      + this.articles[30].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[30].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === true)); // Work in Progress

    // E30
    this.dataSource[2].salesorders = this.dataSource[1].production; // Sales Orders
    this.dataSource[2].additionalparts = this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === false)); // Additional Parts to be produced
    this.dataSource[2].PWS = this.forecasts[0].pss3; // Planned Warehouse Stock
    this.dataSource[2].CWS = this.articles[29].amount; // Current Warehouse Stock
    this.dataSource[2].OiWQ = this.checkQueue(this.queues.find(queue => queue.article === 30 && queue.inwork === false)); // Orders in Waiting Queue
    this.dataSource[2].workinprogress = this.checkQueue(this.queues.find(queue => queue.article === 30 && queue.inwork === true)); // Work in Progress
    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock + Additional Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[2].production =
      this.dataSource[1].production // Sales Order = Production from E31
      + this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === false)) // Additional Parts = Queue from E31
      + this.forecasts[0].pss3 // Planned Warehouse Stock von P3
      + this.articles[29].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[29].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 30 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 30 && queue.inwork === true)); // Work in Progress

    // E6
    this.dataSource[3].salesorders = this.dataSource[2].production; // Sales Orders
    this.dataSource[3].additionalparts = this.checkQueue(this.queues.find(queue => queue.article === 30 && queue.inwork === false)); // Additional Parts to be produced
    this.dataSource[3].PWS = this.forecasts[0].pss3; // Planned Warehouse Stock
    this.dataSource[3].CWS = this.articles[5].amount; // Current Warehouse Stock
    this.dataSource[3].OiWQ = this.checkQueue(this.queues.find(queue => queue.article === 6 && queue.inwork === false)); // Orders in Waiting Queue
    this.dataSource[3].workinprogress = this.checkQueue(this.queues.find(queue => queue.article === 6 && queue.inwork === true)); // Work in Progress
    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[3].production =
      this.dataSource[2].production // Sales Order = Production from E31
      + this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === false)) // Additional Parts = Queue from E31
      + this.forecasts[0].pss3 // Planned Warehouse Stock von P3
      + this.articles[5].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[5].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 6 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 6 && queue.inwork === true)); // Work in Progress

    // E12
    this.dataSource[4].salesorders = this.dataSource[2].production; // Sales Orders
    this.dataSource[4].additionalparts = this.checkQueue(this.queues.find(queue => queue.article === 30 && queue.inwork === false)); // Additional Parts to be produced
    this.dataSource[4].PWS = this.forecasts[0].pss3; // Planned Warehouse Stock
    this.dataSource[4].CWS = this.articles[11].amount; // Current Warehouse Stock
    this.dataSource[4].OiWQ = this.checkQueue(this.queues.find(queue => queue.article === 12 && queue.inwork === false)); // Orders in Waiting Queue
    this.dataSource[4].workinprogress = this.checkQueue(this.queues.find(queue => queue.article === 12 && queue.inwork === true)); // Work in Progress
    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[4].production =
      this.dataSource[2].production // Sales Order = Production from E31
      + this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === false)) // Additional Parts = Queue from E31
      + this.forecasts[0].pss3 // Planned Warehouse Stock von P3
      + this.articles[11].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[11].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 12 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 12 && queue.inwork === true)); // Work in Progress

    // E29
    this.dataSource[5].salesorders = this.dataSource[2].production; // Sales Orders
    this.dataSource[5].additionalparts = this.checkQueue(this.queues.find(queue => queue.article === 30 && queue.inwork === false)); // Additional Parts to be produced
    this.dataSource[5].PWS = this.forecasts[0].pss3; // Planned Warehouse Stock
    this.dataSource[5].CWS = this.articles[28].amount; // Current Warehouse Stock
    this.dataSource[5].OiWQ = this.checkQueue(this.queues.find(queue => queue.article === 29 && queue.inwork === false)); // Orders in Waiting Queue
    this.dataSource[5].workinprogress = this.checkQueue(this.queues.find(queue => queue.article === 29 && queue.inwork === true)); // Work in Progress
    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[5].production =
      this.dataSource[2].production // Sales Order = Production from E31
      + this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === false)) // Additional Parts = Queue from E31
      + this.forecasts[0].pss3 // Planned Warehouse Stock von P3
      + this.articles[28].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[28].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 29 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 29 && queue.inwork === true)); // Work in Progress

    // E9
    this.dataSource[6].salesorders = this.dataSource[5].production; // Sales Orders
    this.dataSource[6].additionalparts = this.checkQueue(this.queues.find(queue => queue.article === 29 && queue.inwork === false)); // Additional Parts to be produced
    this.dataSource[6].PWS = this.forecasts[0].pss3; // Planned Warehouse Stock
    this.dataSource[6].CWS = this.articles[8].amount; // Current Warehouse Stock
    this.dataSource[6].OiWQ = this.checkQueue(this.queues.find(queue => queue.article === 9 && queue.inwork === false)); // Orders in Waiting Queue
    this.dataSource[6].workinprogress = this.checkQueue(this.queues.find(queue => queue.article === 9 && queue.inwork === true)); // Work in Progress
    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[6].production =
      this.dataSource[5].production // Sales Order = Production from E29
      + this.checkQueue(this.queues.find(queue => queue.article === 29 && queue.inwork === false)) // Additional Parts = Queue from E29
      + this.forecasts[0].pss3 // Planned Warehouse Stock von P3
      + this.articles[8].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[8].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 9 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 9 && queue.inwork === true)); // Work in Progress

    // E15
    this.dataSource[7].salesorders = this.dataSource[5].production; // Sales Orders
    this.dataSource[7].additionalparts = this.checkQueue(this.queues.find(queue => queue.article === 29 && queue.inwork === false)); // Additional Parts to be produced
    this.dataSource[7].PWS = this.forecasts[0].pss3; // Planned Warehouse Stock
    this.dataSource[7].CWS = this.articles[14].amount; // Current Warehouse Stock
    this.dataSource[7].OiWQ = this.checkQueue(this.queues.find(queue => queue.article === 15 && queue.inwork === false)); // Orders in Waiting Queue
    this.dataSource[7].workinprogress = this.checkQueue(this.queues.find(queue => queue.article === 15 && queue.inwork === true)); // Work in Progress
    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[7].production =
      this.dataSource[5].production // Sales Order = Production from E29
      + this.checkQueue(this.queues.find(queue => queue.article === 29 && queue.inwork === false)) // Additional Parts = Queue from E29
      + this.forecasts[0].pss3 // Planned Warehouse Stock von P3
      + this.articles[14].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[14].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 15 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 15 && queue.inwork === true)); // Work in Progress

    // E20
    this.dataSource[8].salesorders = this.dataSource[5].production; // Sales Orders
    this.dataSource[8].additionalparts = this.checkQueue(this.queues.find(queue => queue.article === 29 && queue.inwork === false)); // Additional Parts to be produced
    this.dataSource[8].PWS = this.forecasts[0].pss3; // Planned Warehouse Stock
    this.dataSource[8].CWS = this.articles[19].amount; // Current Warehouse Stock
    this.dataSource[8].OiWQ = this.checkQueue(this.queues.find(queue => queue.article === 20 && queue.inwork === false)); // Orders in Waiting Queue
    this.dataSource[8].workinprogress = this.checkQueue(this.queues.find(queue => queue.article === 20 && queue.inwork === true)); // Work in Progress
    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[8].production =
      this.dataSource[5].production // Sales Order = Production from E29
      + this.checkQueue(this.queues.find(queue => queue.article === 29 && queue.inwork === false)) // Additional Parts = Queue from E29
      + this.forecasts[0].pss3 // Planned Warehouse Stock von P3
      + this.articles[19].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[19].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 20 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 20 && queue.inwork === true)); // Work in Progress
  }
}
