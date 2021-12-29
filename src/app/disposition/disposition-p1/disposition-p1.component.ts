import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Article } from 'src/app/models/article';
import { DirectSales } from 'src/app/models/directSales';
import { Forecast } from 'src/app/models/forecast';
import { Order } from 'src/app/models/order';
import { Queue } from 'src/app/models/queue';
import { ProdPlanToolService } from 'src/app/prod-plan-tool.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MultipleUsePartsComponent } from '../multiple-use-parts/multiple-use-parts.component';

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
  {
    partId: 1,
    salesorders: 0,
    additionalparts: 0,
    PWS: 0,
    CWS: 0,
    OiWQ: 0,
    workinprogress: 0,
    additionalwarehousestock: 0,
    production: 0,
  },
  {
    partId: 51,
    salesorders: 0,
    additionalparts: 0,
    PWS: 0,
    CWS: 0,
    OiWQ: 0,
    workinprogress: 0,
    additionalwarehousestock: 0,
    production: 0,
  },
  {
    partId: 50,
    salesorders: 0,
    additionalparts: 0,
    PWS: 0,
    CWS: 0,
    OiWQ: 0,
    workinprogress: 0,
    additionalwarehousestock: 0,
    production: 0,
  },
  {
    partId: 4,
    salesorders: 0,
    additionalparts: 0,
    PWS: 0,
    CWS: 0,
    OiWQ: 0,
    workinprogress: 0,
    additionalwarehousestock: 0,
    production: 0,
  },
  {
    partId: 10,
    salesorders: 0,
    additionalparts: 0,
    PWS: 0,
    CWS: 0,
    OiWQ: 0,
    workinprogress: 0,
    additionalwarehousestock: 0,
    production: 0,
  },
  {
    partId: 49,
    salesorders: 0,
    additionalparts: 0,
    PWS: 0,
    CWS: 0,
    OiWQ: 0,
    workinprogress: 0,
    additionalwarehousestock: 0,
    production: 0,
  },
  {
    partId: 7,
    salesorders: 0,
    additionalparts: 0,
    PWS: 0,
    CWS: 0,
    OiWQ: 0,
    workinprogress: 0,
    additionalwarehousestock: 0,
    production: 0,
  },
  {
    partId: 13,
    salesorders: 0,
    additionalparts: 0,
    PWS: 0,
    CWS: 0,
    OiWQ: 0,
    workinprogress: 0,
    additionalwarehousestock: 0,
    production: 0,
  },
  {
    partId: 18,
    salesorders: 0,
    additionalparts: 0,
    PWS: 0,
    CWS: 0,
    OiWQ: 0,
    workinprogress: 0,
    additionalwarehousestock: 0,
    production: 0,
  },
];

@Component({
  selector: 'app-disposition-p1',
  templateUrl: './disposition-p1.component.html',
  styleUrls: ['./disposition-p1.component.css'],
})
export class DispositionP1Component implements OnInit {
  displayedColumns: string[] = [
    'partId',
    'salesorders',
    'additionalparts',
    'PWS',
    'CWS',
    'OiWQ',
    'workinprogress',
    'additionalwarehousestock',
    'production',
  ];
  dataSource = ELEMENT_DATA;

  forecasts: Forecast[];
  articles: Article[];
  queues: Queue[];
  directSales: DirectSales[];
  orders: Order[];

  constructor(
    private prodPlanToolService: ProdPlanToolService,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show().then(() => {
      this.getAndSetData();
    });
  }

  // Gets the data from the database and updates the local data.
  getAndSetData() {
    // getForecast
    this.prodPlanToolService.getForecasts().subscribe((forcasts) => {
      this.forecasts = forcasts;
      // getArticles
      this.prodPlanToolService.getArticles().subscribe((articles) => {
        this.articles = articles;
        // getQueues
        this.prodPlanToolService.getQueues().subscribe((queues) => {
          this.queues = queues;
          // getDirectSales
          this.prodPlanToolService.getDirectSales().subscribe((directSales) => {
            this.directSales = directSales;
            // getOrders
            this.prodPlanToolService.getOrders().subscribe((orders) => {
              this.orders = orders;
              this.updateDataSource();
              this.updateOrdersInDatabase();
              this.deleteAdditionalOrders();
              this.checkForNegativeProductionValues();
              this.spinner.hide();
            });
          });
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
    this.prodPlanToolService.getArticle(element.partId).subscribe((article) => {
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
    let number: number = 1;
    for (let i = 0; i < this.dataSource.length; i++) {
      let order: Order = {
        id: this.dataSource[i].partId,
        article: this.dataSource[i].partId,
        amount: this.dataSource[i].production,
        priority: number,
        stockvalue: this.dataSource[i].CWS,
      };
      this.updateOrder(order);
      number = number + 1;
      console.log(order);
    }
  }

  // Checks if Object of Queue is null.
  // If inQueue is null return 0
  // Else return amount of inQueue
  checkQueue(inQueue: Queue) {
    if (inQueue == null) return 0;
    return inQueue.amount;
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

  // Updates DataSource and calculates all necessary values.
  updateDataSource() {
    // P1
    this.dataSource[0].salesorders =
      this.forecasts[0].article1 + this.directSales[0].quantity1; // Sales Orders = Forecast from P1 + Direct Sales from P1
    this.dataSource[0].PWS = this.forecasts[0].pss1; // Planned Warehouse Stock
    this.dataSource[0].CWS = this.articles[0].amount; // Current Warehouse Stock
    this.dataSource[0].OiWQ = this.checkQueue(
      this.queues.find((queue) => queue.article === 1 && queue.inwork === false)
    ); // Orders in Waiting Queue
    this.dataSource[0].workinprogress = this.checkQueue(
      this.queues.find((queue) => queue.article === 1 && queue.inwork === true)
    ); // Work in Progress
    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[0].production =
      this.forecasts[0].article1 +
      this.directSales[0].quantity1 + // Sales Orders = Forecast from P1 + Direct Sales from P1
      this.forecasts[0].pss1 + // Planned Warehouse Stock
      this.articles[0].additionalWarehouseStock - // Additional Warehouse Stock
      this.articles[0].amount - // Current Warehouse Stock
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 1 && queue.inwork === false
        )
      ) - // Orders in Waiting Queue
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 1 && queue.inwork === true
        )
      ); // Work in Progress

    // E51
    this.dataSource[1].salesorders = this.dataSource[0].production; // Sales Orders
    this.dataSource[1].additionalparts = this.checkQueue(
      this.queues.find((queue) => queue.article === 1 && queue.inwork === false)
    ); // Additional Parts to be produced
    this.dataSource[1].PWS = this.forecasts[0].pss1; // Planned Warehouse Stock
    this.dataSource[1].CWS = this.articles[50].amount; // Current Warehouse Stock
    this.dataSource[1].OiWQ = this.checkQueue(
      this.queues.find(
        (queue) => queue.article === 51 && queue.inwork === false
      )
    ); // Orders in Waiting Queue
    this.dataSource[1].workinprogress = this.checkQueue(
      this.queues.find((queue) => queue.article === 51 && queue.inwork === true)
    ); // Work in Progress
    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock + Additional Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[1].production =
      this.dataSource[0].production + // Sales Order = Production from P1
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 1 && queue.inwork === false
        )
      ) + // Additional Parts = Queue from P1
      this.forecasts[0].pss1 + // Planned Warehouse Stock von P1
      this.articles[50].additionalWarehouseStock - // Additional Warehouse Stock
      this.articles[50].amount - // Current Warehouse Stock
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 51 && queue.inwork === false
        )
      ) - // Orders in Waiting Queue
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 51 && queue.inwork === true
        )
      ); // Work in Progress

    // E50
    this.dataSource[2].salesorders = this.dataSource[1].production; // Sales Orders
    this.dataSource[2].additionalparts = this.checkQueue(
      this.queues.find(
        (queue) => queue.article === 51 && queue.inwork === false
      )
    ); // Additional Parts to be produced
    this.dataSource[2].PWS = this.forecasts[0].pss1; // Planned Warehouse Stock
    this.dataSource[2].CWS = this.articles[49].amount; // Current Warehouse Stock
    this.dataSource[2].OiWQ = this.checkQueue(
      this.queues.find(
        (queue) => queue.article === 50 && queue.inwork === false
      )
    ); // Orders in Waiting Queue
    this.dataSource[2].workinprogress = this.checkQueue(
      this.queues.find((queue) => queue.article === 50 && queue.inwork === true)
    ); // Work in Progress
    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock + Additional Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[2].production =
      this.dataSource[1].production + // Sales Order = Production from E51
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 51 && queue.inwork === false
        )
      ) + // Additional Parts = Queue from E51
      this.forecasts[0].pss1 + // Planned Warehouse Stock von P1
      this.articles[49].additionalWarehouseStock - // Additional Warehouse Stock
      this.articles[49].amount - // Current Warehouse Stock
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 50 && queue.inwork === false
        )
      ) - // Orders in Waiting Queue
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 50 && queue.inwork === true
        )
      ); // Work in Progress

    // E4
    this.dataSource[3].salesorders = this.dataSource[2].production; // Sales Orders
    this.dataSource[3].additionalparts = this.checkQueue(
      this.queues.find(
        (queue) => queue.article === 50 && queue.inwork === false
      )
    ); // Additional Parts to be produced
    this.dataSource[3].PWS = this.forecasts[0].pss1; // Planned Warehouse Stock
    this.dataSource[3].CWS = this.articles[3].amount; // Current Warehouse Stock
    this.dataSource[3].OiWQ = this.checkQueue(
      this.queues.find((queue) => queue.article === 4 && queue.inwork === false)
    ); // Orders in Waiting Queue
    this.dataSource[3].workinprogress = this.checkQueue(
      this.queues.find((queue) => queue.article === 4 && queue.inwork === true)
    ); // Work in Progress
    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock + Additional Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[3].production =
      this.dataSource[2].production + // Sales Order = Production from E50
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 50 && queue.inwork === false
        )
      ) + // Additional Parts = Queue from E50
      this.forecasts[0].pss1 + // Planned Warehouse Stock von P1
      this.articles[3].additionalWarehouseStock - // Additional Warehouse Stock
      this.articles[3].amount - // Current Warehouse Stock
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 4 && queue.inwork === false
        )
      ) - // Orders in Waiting Queue
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 4 && queue.inwork === true
        )
      ); // Work in Progress

    // E10
    this.dataSource[4].salesorders = this.dataSource[2].production; // Sales Orders
    this.dataSource[4].additionalparts = this.checkQueue(
      this.queues.find(
        (queue) => queue.article === 50 && queue.inwork === false
      )
    ); // Additional Parts to be produced
    this.dataSource[4].PWS = this.forecasts[0].pss1; // Planned Warehouse Stock
    this.dataSource[4].CWS = this.articles[9].amount; // Current Warehouse Stock
    this.dataSource[4].OiWQ = this.checkQueue(
      this.queues.find(
        (queue) => queue.article === 10 && queue.inwork === false
      )
    ); // Orders in Waiting Queue
    this.dataSource[4].workinprogress = this.checkQueue(
      this.queues.find((queue) => queue.article === 10 && queue.inwork === true)
    ); // Work in Progress
    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock + Additional Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[4].production =
      this.dataSource[2].production + // Sales Order = Production from E50
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 50 && queue.inwork === false
        )
      ) + // Additional Parts = Queue from E50
      this.forecasts[0].pss1 + // Planned Warehouse Stock von P1
      this.articles[9].additionalWarehouseStock - // Additional Warehouse Stock
      this.articles[9].amount - // Current Warehouse Stock
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 10 && queue.inwork === false
        )
      ) - // Orders in Waiting Queue
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 10 && queue.inwork === true
        )
      ); // Work in Progress

    // E49
    this.dataSource[5].salesorders = this.dataSource[2].production; // Sales Orders
    this.dataSource[5].additionalparts = this.checkQueue(
      this.queues.find(
        (queue) => queue.article === 50 && queue.inwork === false
      )
    ); // Additional Parts to be produced
    this.dataSource[5].PWS = this.forecasts[0].pss1; // Planned Warehouse Stock
    this.dataSource[5].CWS = this.articles[48].amount; // Current Warehouse Stock
    this.dataSource[5].OiWQ = this.checkQueue(
      this.queues.find(
        (queue) => queue.article === 49 && queue.inwork === false
      )
    ); // Orders in Waiting Queue
    this.dataSource[5].workinprogress = this.checkQueue(
      this.queues.find((queue) => queue.article === 49 && queue.inwork === true)
    ); // Work in Progress
    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock + Additional Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[5].production =
      this.dataSource[2].production + // Sales Order = Production from E50
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 50 && queue.inwork === false
        )
      ) + // Additional Parts = Queue from E50
      this.forecasts[0].pss1 + // Planned Warehouse Stock von P1
      this.articles[48].additionalWarehouseStock - // Additional Warehouse Stock
      this.articles[48].amount - // Current Warehouse Stock
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 49 && queue.inwork === false
        )
      ) - // Orders in Waiting Queue
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 49 && queue.inwork === true
        )
      ); // Work in Progress

    // E7
    this.dataSource[6].salesorders = this.dataSource[5].production; // Sales Orders
    this.dataSource[6].additionalparts = this.checkQueue(
      this.queues.find(
        (queue) => queue.article === 49 && queue.inwork === false
      )
    ); // Additional Parts to be produced
    this.dataSource[6].PWS = this.forecasts[0].pss1; // Planned Warehouse Stock
    this.dataSource[6].CWS = this.articles[6].amount; // Current Warehouse Stock
    this.dataSource[6].OiWQ = this.checkQueue(
      this.queues.find((queue) => queue.article === 7 && queue.inwork === false)
    ); // Orders in Waiting Queue
    this.dataSource[6].workinprogress = this.checkQueue(
      this.queues.find((queue) => queue.article === 7 && queue.inwork === true)
    ); // Work in Progress
    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock + Additional Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[6].production =
      this.dataSource[5].production + // Sales Order = Production from E49
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 49 && queue.inwork === false
        )
      ) + // Additional Parts = Queue from E49
      this.forecasts[0].pss1 + // Planned Warehouse Stock von P1
      this.articles[6].additionalWarehouseStock - // Additional Warehouse Stock
      this.articles[6].amount - // Current Warehouse Stock
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 7 && queue.inwork === false
        )
      ) - // Orders in Waiting Queue
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 7 && queue.inwork === true
        )
      ); // Work in Progress

    // E13
    this.dataSource[7].salesorders = this.dataSource[5].production; // Sales Orders
    this.dataSource[7].additionalparts = this.checkQueue(
      this.queues.find(
        (queue) => queue.article === 49 && queue.inwork === false
      )
    ); // Additional Parts to be produced
    this.dataSource[7].PWS = this.forecasts[0].pss1; // Planned Warehouse Stock
    this.dataSource[7].CWS = this.articles[12].amount; // Current Warehouse Stock
    this.dataSource[7].OiWQ = this.checkQueue(
      this.queues.find(
        (queue) => queue.article === 13 && queue.inwork === false
      )
    ); // Orders in Waiting Queue
    this.dataSource[7].workinprogress = this.checkQueue(
      this.queues.find((queue) => queue.article === 13 && queue.inwork === true)
    ); // Work in Progress
    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock + Additional Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[7].production =
      this.dataSource[5].production + // Sales Order = Production from E49
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 49 && queue.inwork === false
        )
      ) + // Additional Parts = Queue from E49
      this.forecasts[0].pss1 + // Planned Warehouse Stock von P1
      this.articles[12].additionalWarehouseStock - // Additional Warehouse Stock
      this.articles[12].amount - // Current Warehouse Stock
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 13 && queue.inwork === false
        )
      ) - // Orders in Waiting Queue
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 13 && queue.inwork === true
        )
      ); // Work in Progress

    // E18
    this.dataSource[8].salesorders = this.dataSource[5].production; // Sales Orders
    this.dataSource[8].additionalparts = this.checkQueue(
      this.queues.find(
        (queue) => queue.article === 49 && queue.inwork === false
      )
    ); // Additional Parts to be produced
    this.dataSource[8].PWS = this.forecasts[0].pss1; // Planned Warehouse Stock
    this.dataSource[8].CWS = this.articles[17].amount; // Current Warehouse Stock
    this.dataSource[8].OiWQ = this.checkQueue(
      this.queues.find(
        (queue) => queue.article === 18 && queue.inwork === false
      )
    ); // Orders in Waiting Queue
    this.dataSource[8].workinprogress = this.checkQueue(
      this.queues.find((queue) => queue.article === 18 && queue.inwork === true)
    ); // Work in Progress
    // Production
    // Production = Sales Orders + Additional Parts + Planned Warehouse Stock + Additional Warehouse Stock - Current Warehouse - Orders in Waiting Queue - Work in Progress
    this.dataSource[8].production =
      this.dataSource[5].production + // Sales Order = Production from E49
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 49 && queue.inwork === false
        )
      ) + // Additional Parts = Queue from E49
      this.forecasts[0].pss1 + // Planned Warehouse Stock von P1
      this.articles[17].additionalWarehouseStock - // Additional Warehouse Stock
      this.articles[17].amount - // Current Warehouse Stock
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 18 && queue.inwork === false
        )
      ) - // Orders in Waiting Queue
      this.checkQueue(
        this.queues.find(
          (queue) => queue.article === 18 && queue.inwork === true
        )
      ); // Work in Progress
  }
}
