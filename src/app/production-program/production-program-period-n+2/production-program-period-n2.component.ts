import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Article } from 'src/app/models/article';
import { Forecast } from 'src/app/models/forecast';
import { Order } from 'src/app/models/order';
import { Queue } from 'src/app/models/queue';
import { ProdPlanToolService } from 'src/app/prod-plan-tool.service';
import { ProductionProgramPeriodN3Component } from '../production-program-period-n+3/production-program-period-n3.component';

export interface ProductionProgramElement {
  product: string;
  forecastn2: number; // Voraussage für Periode n+2
  warehousestockn2: number; // Lagerbestand am Ende der Vorperiode
  pssn3: number; // Geplanter Lagerbestand am Ende der Planperiode (Sicherheitsbestand)
  productionn2: number; // Produktionsaufträge
}

const ELEMENT_DATA: ProductionProgramElement[] = [
  {product: 'P1', forecastn2: 0, warehousestockn2: 0, pssn3: 0, productionn2: 0},
  {product: 'P2', forecastn2: 0, warehousestockn2: 0, pssn3: 0, productionn2: 0},
  {product: 'P3', forecastn2: 0, warehousestockn2: 0, pssn3: 0, productionn2: 0},
];

@Component({
  selector: 'app-production-program-period-n2',
  templateUrl: './production-program-period-n2.component.html',
  styleUrls: ['./production-program-period-n2.component.css', '../../app.component.css']
})

// Period n+2
export class ProductionProgramPeriodN2Component implements OnInit {
  displayedColumns: string[] = ['product', 'forecastn2', 'warehousestockn2', 'pssn3', 'productionn2']
  dataSource = ELEMENT_DATA;

  forecasts: Forecast[];
  articles: Article[];
  queues: Queue[];
  orders: Order[];

  forecast1: number;
  forecast2: number;
  forecast3: number;
  pss1: number;
  pss2: number;
  pss3: number;

  constructor(private prodPlanToolService: ProdPlanToolService, private _snackBar: MatSnackBar, private translate: TranslateService) { }

  ngOnInit(): void {
    this.GetAndSetData();
  }

   // Gets the data from the database and updates the local data.
   GetAndSetData() {
     this.prodPlanToolService.getOrders().subscribe(orders => {
       this.orders = orders;
      // Gets all forecasts from the database.
      this.prodPlanToolService.getForecasts()
      .subscribe(forecasts => {
        this.forecasts = forecasts;
        // Gets all articels from the database.
        this.prodPlanToolService.getArticles()
          .subscribe(articles => {
            this.articles = articles;
            // Gets all queues from the database.
            this.prodPlanToolService.getQueues()
              .subscribe(queues => {
                this.queues = queues;
                this.updateForecastAndPlannedSafetyStock();
                this.updateDataSource();
                this.checkForNegativeProductionValues();
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

  updateForecastAndPlannedSafetyStock() {
    this.forecast1 = this.forecasts[2].article1
    this.forecast2 = this.forecasts[2].article2
    this.forecast3 = this.forecasts[2].article3
    this.pss1 = this.forecasts[2].pss1;
    this.pss2 = this.forecasts[2].pss2;
    this.pss3 = this.forecasts[2].pss3;
  }

  // Updates a given forecast in the database depending on the id.
  updateForecast(forecast: Forecast) {
    // Instanciates an objekt of the component that realizes the next period.
    let productionProgramPeriodN3Component = new ProductionProgramPeriodN3Component(this.prodPlanToolService, this._snackBar, this.translate);
    this.prodPlanToolService.updateForecast(forecast).subscribe(res => {
      this.GetAndSetData()
      // Calls the getAndSetData-function for the next period to render the changes made in this component.
      productionProgramPeriodN3Component.GetAndSetData();
    });
  }

  // Updates the value for pss1, pss2 for pss3 in the database depending on the article the safety stock has been changed for.
  updateProduction(row) {
    this.deleteAdditionalOrders();
    // Checks what articles safety stock has been changed.
    if(row.product === "P1") {
      this.forecast1 = parseInt(row.forecastn2),
      this.pss1 = parseInt(row.pssn3)
    };
    if(row.product === "P2") {
      this.forecast2 = parseInt(row.forecastn2),
      this.pss2 = parseInt(row.pssn3)
    };
    if(row.product === "P3") {
      this.forecast3 = parseInt(row.forecastn2),
      this.pss3 = parseInt(row.pssn3)
    };
    console.log(row);

    // Forecasts[2] is the forecast for the period n+2.
    const forecast = {
      id: this.forecasts[2].id,
      period: this.forecasts[0].period + 2,
      article1: this.forecast1,
      article2: this.forecast2,
      article3: this.forecast3,
      pss1: this.pss1,
      pss2: this.pss2,
      pss3: this.pss3,
    }

    this.updateForecast(forecast)
    console.log(forecast);
  }

  // Checks for negative production values.
  // If found opens a snackbar message.
  checkForNegativeProductionValues() {
    if(this.dataSource.find(tableElement => tableElement.productionn2 < 0)) {
      this.translate.get('manufacturingSequence.checkForNegativeProductionValues').subscribe((message: string) => {
        this.translate.get('close').subscribe((action: string) => {
          this._snackBar.open(message, action);
        })
      })
    }
  }

  updateDataSource() {

    // Safety Stock= Warehouse Stock + Planned Safety Stock n + Planned Safety Stock n+1
    this.dataSource[0].warehousestockn2 = this.forecasts[1].pss1;
    this.dataSource[1].warehousestockn2 = this.forecasts[1].pss2;
    this.dataSource[2].warehousestockn2 = this.forecasts[1].pss3;

    // Production = Forecast + Safety Stock + Planned Safety Stock
    this.dataSource[0].productionn2 = this.forecast1 - (this.forecasts[1].pss1) + this.pss1;
    this.dataSource[1].productionn2 = this.forecast2 - (this.forecasts[1].pss2) + this.pss2;
    this.dataSource[2].productionn2 = this.forecast3 - (this.forecasts[1].pss3) + this.pss3;
  }

  checkRouteToDisposition() {
    return this.dataSource.some(
      (prodProgram) =>
        prodProgram.productionn2 < 0
    );
  }
}
