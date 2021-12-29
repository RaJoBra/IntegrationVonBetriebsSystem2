import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Article } from 'src/app/models/article';
import { DirectSales } from 'src/app/models/directSales';
import { Forecast } from 'src/app/models/forecast';
import { Order } from 'src/app/models/order';
import { Queue } from 'src/app/models/queue';
import { ProdPlanToolService } from 'src/app/prod-plan-tool.service';

export interface ProductionProgramElement {
  partId: number;
  salesorders: number;
  additionalparts: number; // Additional Parts to be produced for the Queue
  PWS: number; // Planned Warehouse Stock
  CWS: number; // Current Warehouse Stock
  OiWQ: number; // Orders in Waiting Queue
  workinprogress: number; // Work in Progress
  production: number; // Parts (amount) that have to be produced
  additionalwarehousestock: number; // Additional Planned Warehouse Stock
}

const ELEMENT_DATA: ProductionProgramElement[] = [
  {partId: 26, salesorders: 0, additionalparts: 0, PWS: 0, CWS: 0, OiWQ: 0, workinprogress: 0, additionalwarehousestock: 0, production: 0},
  {partId: 16, salesorders: 0, additionalparts: 0, PWS: 0, CWS: 0, OiWQ: 0, workinprogress: 0, additionalwarehousestock: 0, production: 0},
  {partId: 17, salesorders: 0, additionalparts: 0, PWS: 0, CWS: 0, OiWQ: 0, workinprogress: 0, additionalwarehousestock: 0, production: 0},
];

@Component({
  selector: 'app-multiple-use-parts',
  templateUrl: './multiple-use-parts.component.html',
  styleUrls: ['./multiple-use-parts.component.css']
})

export class MultipleUsePartsComponent implements OnInit {
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

  // Gets all necessary data from the database and updates them.
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
          this.prodPlanToolService.getDirectSales()
          .subscribe(directSales => {
            this.directSales = directSales;
             // getOrders
            this.prodPlanToolService.getOrders()
              .subscribe(orders => {
                this.orders = orders;
                this.updateDataSource();
                this.updateOrdersInDatabase();
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
    this.prodPlanToolService.updateArticle(article).subscribe(res => this.getAndSetData());
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
    let number: number = 28
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

    //E26
    // Sales Orders
    this.dataSource[0].salesorders =
    this.forecasts[0].article1 + this.directSales[0].quantity1 // Sales Orders = Forecast from P1 + Direct Sales from P1
      + this.forecasts[0].pss1 // Planned Warehouse Stock from P1
      + this.articles[0].additionalWarehouseStock // Additional Warehouse Stock from P1
      - this.articles[0].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 1 && queue.inwork === false)) // Orders in Waiting Queue from P1
      - this.checkQueue(this.queues.find(queue => queue.article === 1 && queue.inwork === true)) + // Work in Progress from P1
    this.forecasts[0].article2 + this.directSales[0].quantity2 // Sales Orders = Forecast from P2 + Direct Sales from P2
      + this.forecasts[0].pss2 // Planned Warehouse Stock from P2
      + this.articles[1].additionalWarehouseStock // Additional Warehouse Stock from P2
      - this.articles[1].amount // Current Warehouse Stock from P2
      - this.checkQueue(this.queues.find(queue => queue.article === 2 && queue.inwork === false)) // Orders in Waiting Queue from P2
      - this.checkQueue(this.queues.find(queue => queue.article === 2 && queue.inwork === true)) + // Work in Progress from P2
    this.forecasts[0].article3 + this.directSales[0].quantity3 // Sales Orders = Forecast from P3 + Direct Sales from P3
      + this.forecasts[0].pss3 // Planned Warehouse Stock von P3
      + this.articles[2].additionalWarehouseStock // Additional Warehouse Stock from P3
      - this.articles[2].amount // Current Warehouse Stock from P3
      - this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === false)) // Orders in Waiting Queue from P3
      - this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === true)); // Work in Progress from P3

    this.dataSource[0].additionalparts = this.checkQueue(this.queues.find(queue => queue.article === 1 && queue.inwork === false)) // Additional Parts to be produced
      + this.checkQueue(this.queues.find(queue => queue.article === 2 && queue.inwork === false))
      + this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === false));
    this.dataSource[0].PWS = this.forecasts[0].pss1 + this.forecasts[0].pss2 + this.forecasts[0].pss3; // Planned Warehouse Stock
    this.dataSource[0].CWS = this.articles[25].amount; // Current Warehouse Stock
    this.dataSource[0].OiWQ = this.checkQueue(this.queues.find(queue => queue.article === 26 && queue.inwork === false)); // Orders in Waiting Queue
    this.dataSource[0].OiWQ = this.checkQueue(this.queues.find(queue => queue.article === 26 && queue.inwork === true)); // Work in Progress

    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock + Additional Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[0].production =
    this.forecasts[0].article1 + this.directSales[0].quantity1 // Sales Orders = Forecast from P1 + Direct Sales from P1
      + this.forecasts[0].pss1 // Planned Warehouse Stock from P1
      + this.articles[0].additionalWarehouseStock // Additional Warehouse Stock from P1
      - this.articles[0].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 1 && queue.inwork === false)) // Orders in Waiting Queue from P1
      - this.checkQueue(this.queues.find(queue => queue.article === 1 && queue.inwork === true)) + // Work in Progress from P1
    this.forecasts[0].article2 + this.directSales[0].quantity2 // Sales Orders = Forecast from P2 + Direct Sales from P2
      + this.forecasts[0].pss2 // Planned Warehouse Stock from P2
      + this.articles[1].additionalWarehouseStock // Additional Warehouse Stock from P2
      - this.articles[1].amount // Current Warehouse Stock from P2
      - this.checkQueue(this.queues.find(queue => queue.article === 2 && queue.inwork === false)) // Orders in Waiting Queue from P2
      - this.checkQueue(this.queues.find(queue => queue.article === 2 && queue.inwork === true)) + // Work in Progress from P2
    this.forecasts[0].article3 + this.directSales[0].quantity3 // Sales Orders = Forecast from P3 + Direct Sales from P3
      + this.forecasts[0].pss3 // Planned Warehouse Stock von P3
      + this.articles[2].additionalWarehouseStock // Additional Warehouse Stock from P3
      - this.articles[2].amount // Current Warehouse Stock from P3
      - this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === false)) // Orders in Waiting Queue from P3
      - this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === true)) // Work in Progress from P3
    + this.checkQueue(this.queues.find(queue => queue.article === 1 && queue.inwork === false)) // Additional Parts from P1
    + this.checkQueue(this.queues.find(queue => queue.article === 2 && queue.inwork === false)) // Additional Parts from P2
    + this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === false)) // Additional Parts from P3
    + this.forecasts[0].pss1 + this.forecasts[0].pss2 + this.forecasts[0].pss3 // Planned Warehouse Stock from P1, P2 & P3
    + this.articles[25].additionalWarehouseStock // Additional Warehouse Stock
    - this.articles[25].amount // Current Warehouse
    - this.checkQueue(this.queues.find(queue => queue.article === 26 && queue.inwork === false)) // Orders in Waiting Queue
    - this.checkQueue(this.queues.find(queue => queue.article === 26 && queue.inwork === true)); // Work in Progress

    // E16
    // Sales Orders
    this.dataSource[1].salesorders =
    // Production from E51
    this.forecasts[0].article1 + this.directSales[0].quantity1 // Sales Orders = Forecast from P1 + Direct Sales from P1
      + this.forecasts[0].pss1 // Planned Warehouse Stock
      + this.articles[0].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[0].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 1 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 1 && queue.inwork === true)) // Work in Progress
      + this.checkQueue(this.queues.find(queue => queue.article === 1 && queue.inwork === false)) // Additional Parts = Queue from P1
      + this.forecasts[0].pss1 // Planned Warehouse Stock von P1
      + this.articles[50].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[50].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 51 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 51 && queue.inwork === true)) + // Work in Progress
    // Production from E56
    this.forecasts[0].article2 + this.directSales[0].quantity2 // Sales Orders = Forecast from P2 + Direct Sales from P2
      + this.forecasts[0].pss2 // Planned Warehouse Stock
      + this.articles[1].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[1].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 2 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 2 && queue.inwork === true)) // Work in Progress
      + this.checkQueue(this.queues.find(queue => queue.article === 2 && queue.inwork === false)) // Additional Parts = Queue from P2
      + this.forecasts[0].pss2 // Planned Warehouse Stock von P2
      + this.articles[55].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[55].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 56 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 56 && queue.inwork === true)) + // Work in Progress
    // Production from E31
    this.forecasts[0].article3 + this.directSales[0].quantity3 // Sales Orders = Forecast from P3 + Direct Sales from P3
      + this.forecasts[0].pss3 // Planned Warehouse Stock von P3
      + this.articles[2].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[2].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === true)) // Work in Progress
      + this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === false)) // Additional Parts = Queue from P3
      + this.forecasts[0].pss3 // Planned Warehouse Stock von P3
      + this.articles[30].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[30].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === true));

    this.dataSource[1].additionalparts = this.checkQueue(this.queues.find(queue => queue.article === 51 && queue.inwork === false)) // Additional Parts to be produced
      + this.checkQueue(this.queues.find(queue => queue.article === 56 && queue.inwork === false))
      + this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === false));
    this.dataSource[1].PWS = this.forecasts[0].pss1 + this.forecasts[0].pss2 + this.forecasts[0].pss3; // Planned Warehouse Stock
    this.dataSource[1].CWS = this.articles[15].amount; // Current Warehouse Stock
    this.dataSource[1].OiWQ = this.checkQueue(this.queues.find(queue => queue.article === 16 && queue.inwork === false)); // Orders in Waiting Queue
    this.dataSource[1].OiWQ = this.checkQueue(this.queues.find(queue => queue.article === 16 && queue.inwork === true)); // Work in Progress

    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock + Additional Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[1].production =
    this.forecasts[0].article1 + this.directSales[0].quantity1 // Sales Orders = Forecast from P1 + Direct Sales from P1
      + this.forecasts[0].pss1 // Planned Warehouse Stock
      + this.articles[0].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[0].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 1 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 1 && queue.inwork === true)) // Work in Progress
      + this.checkQueue(this.queues.find(queue => queue.article === 1 && queue.inwork === false)) // Additional Parts = Queue from P1
      + this.forecasts[0].pss1 // Planned Warehouse Stock von P1
      + this.articles[50].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[50].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 51 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 51 && queue.inwork === true)) + // Work in Progress
    // Production from E56
    this.forecasts[0].article2 + this.directSales[0].quantity2 // Sales Orders = Forecast from P2 + Direct Sales from P2
      + this.forecasts[0].pss2 // Planned Warehouse Stock
      + this.articles[1].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[1].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 2 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 2 && queue.inwork === true)) // Work in Progress
      + this.checkQueue(this.queues.find(queue => queue.article === 2 && queue.inwork === false)) // Additional Parts = Queue from P2
      + this.forecasts[0].pss2 // Planned Warehouse Stock von P2
      + this.articles[55].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[55].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 56 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 56 && queue.inwork === true)) + // Work in Progress
    // Production from E31
    this.forecasts[0].article3 + this.directSales[0].quantity3 // Sales Orders = Forecast from P3 + Direct Sales from P3
      + this.forecasts[0].pss3 // Planned Warehouse Stock von P3
      + this.articles[2].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[2].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === true)) // Work in Progress
      + this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === false)) // Additional Parts = Queue from P3
      + this.forecasts[0].pss3 // Planned Warehouse Stock von P3
      + this.articles[30].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[30].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === true))
    + this.checkQueue(this.queues.find(queue => queue.article === 51 && queue.inwork === false)) // Additional Parts from E51
    + this.checkQueue(this.queues.find(queue => queue.article === 56 && queue.inwork === false)) // Additional Parts from E56
    + this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === false)) // Additional Parts from E31
    + this.forecasts[0].pss1 + this.forecasts[0].pss2 + this.forecasts[0].pss3 // Planned Warehouse Stock from P1, P2 & P3
    + this.articles[15].additionalWarehouseStock // Additional Warehouse Stock
    - this.articles[15].amount // Current Warehouse
    - this.checkQueue(this.queues.find(queue => queue.article === 16 && queue.inwork === false)) // Orders in Waiting Queue
    - this.checkQueue(this.queues.find(queue => queue.article === 16 && queue.inwork === true)); // Work in Progress

    // E17
    this.dataSource[2].salesorders =
    // Production from E51
    this.forecasts[0].article1 + this.directSales[0].quantity1 // Sales Orders = Forecast from P1 + Direct Sales from P1
      + this.forecasts[0].pss1 // Planned Warehouse Stock
      + this.articles[0].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[0].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 1 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 1 && queue.inwork === true)) // Work in Progress
      + this.checkQueue(this.queues.find(queue => queue.article === 1 && queue.inwork === false)) // Additional Parts = Queue from P1
      + this.forecasts[0].pss1 // Planned Warehouse Stock von P1
      + this.articles[50].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[50].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 51 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 51 && queue.inwork === true)) + // Work in Progress
    // Production from E56
    this.forecasts[0].article2 + this.directSales[0].quantity2 // Sales Orders = Forecast from P2 + Direct Sales from P2
      + this.forecasts[0].pss2 // Planned Warehouse Stock
      + this.articles[1].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[1].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 2 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 2 && queue.inwork === true)) // Work in Progress
      + this.checkQueue(this.queues.find(queue => queue.article === 2 && queue.inwork === false)) // Additional Parts = Queue from P2
      + this.forecasts[0].pss2 // Planned Warehouse Stock von P2
      + this.articles[55].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[55].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 56 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 56 && queue.inwork === true)) + // Work in Progress
    // Production from E31
    this.forecasts[0].article3 + this.directSales[0].quantity3 // Sales Orders = Forecast from P3 + Direct Sales from P3
      + this.forecasts[0].pss3 // Planned Warehouse Stock von P3
      + this.articles[2].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[2].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === true)) // Work in Progress
      + this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === false)) // Additional Parts = Queue from P3
      + this.forecasts[0].pss3 // Planned Warehouse Stock von P3
      + this.articles[30].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[30].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === true));

    this.dataSource[2].additionalparts = this.checkQueue(this.queues.find(queue => queue.article === 51 && queue.inwork === false)) // Additional Parts to be produced
      + this.checkQueue(this.queues.find(queue => queue.article === 56 && queue.inwork === false))
      + this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === false));
    this.dataSource[2].PWS = this.forecasts[0].pss1 + this.forecasts[0].pss2 + this.forecasts[0].pss3; // Planned Warehouse Stock
    this.dataSource[2].CWS = this.articles[16].amount; // Current Warehouse Stock
    this.dataSource[2].OiWQ = this.checkQueue(this.queues.find(queue => queue.article === 17 && queue.inwork === false)); // Orders in Waiting Queue
    this.dataSource[2].OiWQ = this.checkQueue(this.queues.find(queue => queue.article === 17 && queue.inwork === true)); // Work in Progress

    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock + Additional Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[2].production =
    // Production from E51
    this.forecasts[0].article1 + this.directSales[0].quantity1 // Sales Orders = Forecast from P1 + Direct Sales from P1
      + this.forecasts[0].pss1 // Planned Warehouse Stock
      + this.articles[0].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[0].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 1 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 1 && queue.inwork === true)) // Work in Progress
      + this.checkQueue(this.queues.find(queue => queue.article === 1 && queue.inwork === false)) // Additional Parts = Queue from P1
      + this.forecasts[0].pss1 // Planned Warehouse Stock von P1
      + this.articles[50].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[50].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 51 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 51 && queue.inwork === true)) + // Work in Progress
    // Production from E56
    this.forecasts[0].article2 + this.directSales[0].quantity2 // Sales Orders = Forecast from P2 + Direct Sales from P2
      + this.forecasts[0].pss2 // Planned Warehouse Stock
      + this.articles[1].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[1].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 2 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 2 && queue.inwork === true)) // Work in Progress
      + this.checkQueue(this.queues.find(queue => queue.article === 2 && queue.inwork === false)) // Additional Parts = Queue from P2
      + this.forecasts[0].pss2 // Planned Warehouse Stock von P2
      + this.articles[55].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[55].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 56 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 56 && queue.inwork === true)) + // Work in Progress
    // Production from E31
    this.forecasts[0].article3 + this.directSales[0].quantity3 // Sales Orders = Forecast from P3 + Direct Sales from P3
      + this.forecasts[0].pss3 // Planned Warehouse Stock von P3
      + this.articles[2].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[2].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === true)) // Work in Progress
      + this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === false)) // Additional Parts = Queue from P3
      + this.forecasts[0].pss3 // Planned Warehouse Stock von P3
      + this.articles[30].additionalWarehouseStock // Additional Warehouse Stock
      - this.articles[30].amount // Current Warehouse Stock
      - this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === false)) // Orders in Waiting Queue
      - this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === true))
    + this.checkQueue(this.queues.find(queue => queue.article === 51 && queue.inwork === false)) // Additional Parts from E51
    + this.checkQueue(this.queues.find(queue => queue.article === 56 && queue.inwork === false)) // Additional Parts from E56
    + this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === false)) // Additional Parts from E31
    + this.forecasts[0].pss1 + this.forecasts[0].pss2 + this.forecasts[0].pss3 // Planned Warehouse Stock from P1, P2 & P3
    + this.articles[16].additionalWarehouseStock // Additional Warehouse Stock
    - this.articles[16].amount // Current Warehouse
    - this.checkQueue(this.queues.find(queue => queue.article === 17 && queue.inwork === false)) // Orders in Waiting Queue
    - this.checkQueue(this.queues.find(queue => queue.article === 17 && queue.inwork === true)); // Work in Progress
  }
}
