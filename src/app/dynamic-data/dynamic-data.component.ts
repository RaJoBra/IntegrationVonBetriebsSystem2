import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { Forecast } from '../models/forecast';
import { FutureInwardStockMovement } from '../models/futureInwardStockMovement';
import { IdleTimeCost } from '../models/idleTimeCost';
import { Queue } from '../models/queue';
import { StrategicData } from '../models/strategicData';
import { ProdPlanToolService } from '../prod-plan-tool.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {NavbarComponent} from '../navbar/navbar.component';
import {ProcessNavbarComponent} from '../process-navbar/process-navbar.component';

interface WareHouseStock {
  article: number;
  amount: number;
  price: string;
  value: string;
}

interface CapacityPerWorkstation {
  workstation: number,
  capacity: number,
}

interface FutureInwardStockMovementTableElement {
  article: number;
  arrivingPeriod: number;
  mode: string;
  amount: number;
}

interface StrategicDataTableElement {
  label: string;
  dataCurrent: number;
  dataAverage: number;
}

@Component({
  selector: 'app-dynamic-data',
  templateUrl: './dynamic-data.component.html',
  styleUrls: ['./dynamic-data.component.css', '../app.component.css']
})
export class DynamicDataComponent implements OnInit {
  displayedColumnsWareHouseStock: string[] = ['article', 'amount', 'price', 'value'];
  displayedColumnsQueues: string[] = ['article', 'amount', 'time', 'workstation'];
  displayedColumnsCapacityPerQueue: string[] = ['workstation', 'capacity'];
  displayedColumnsFutureInwardStockMovement: string[] = ['article', 'amount', 'arrivingPeriod', 'mode'];
  displayedColumnsIdleTimes: string[] = ['workstation', 'setupEvents', 'idleTime', 'wageIdletimeCosts', 'wageCosts', 'machineIdleTimeCosts'];
  displayedColumnsResult: string[] = ['keyFigure', 'dataCurrent', 'dataAverage'];

  wareHouseStockDataSource: WareHouseStock[] = [];
  queuesInWorkDataSource: Queue[] = [];
  queuesNotInWorkDataSource: Queue[] = [];
  futureInwardStockMovementsDataSource: FutureInwardStockMovementTableElement[] = [];

  strategicData: StrategicData;
  STRATEGIC_DATA_TABLE_DATA: StrategicDataTableElement[] = [];
  articles: Article[] = [];
  queues: Queue[] = [];
  futureInwardStockMovements: FutureInwardStockMovement[]= [];
  forecast: Forecast;
  idleTimes: IdleTimeCost[] = [];
  capacityPerWorkStation: CapacityPerWorkstation[] = [
    {workstation: 1, capacity: 0},
    {workstation: 2, capacity: 0},
    {workstation: 3, capacity: 0},
    {workstation: 4, capacity: 0},
    {workstation: 6, capacity: 0},
    {workstation: 7, capacity: 0},
    {workstation: 8, capacity: 0},
    {workstation: 9, capacity: 0},
    {workstation: 10, capacity: 0},
    {workstation: 11, capacity: 0},
    {workstation: 12, capacity: 0},
    {workstation: 13, capacity: 0},
    {workstation: 14, capacity: 0},
    {workstation: 15, capacity: 0},
  ];

  constructor(private productionPlanningToolService: ProdPlanToolService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if(ProcessNavbarComponent.productionProgram) {
      this.spinner.show().then(() => {
        this.productionPlanningToolService.getArticles().subscribe(articles => {
          this.articles = articles;
          this.productionPlanningToolService.getIdleTimeCosts().subscribe(idleTimes => {
            this.idleTimes = idleTimes;
            this.productionPlanningToolService.getStrategicDatas().subscribe(strategicData => {
              this.strategicData = strategicData[0];
              this.productionPlanningToolService.getForecast(1).subscribe(forecast => {
                this.forecast = forecast;
                this.productionPlanningToolService.getQueues().subscribe(queues => {
                  this.queues = queues;
                  this.productionPlanningToolService.getFutureInwardStockMovements().subscribe(futureInwardStockMovements => {
                    this.futureInwardStockMovements = futureInwardStockMovements;
                    this.updateWareHouseStockDataSource();
                    this.updateQueuesDataSources();
                    this.updatefutureInwardStockMovementsDataSource();
                    this.fillStrategicDataDataSource();
                    this.spinner.hide();
                  });
                });
              });
            });
          });
        });
      });
    }
  }

  fillStrategicDataDataSource() {
    this.STRATEGIC_DATA_TABLE_DATA = [
      {label: 'dynamicData.wageCosts', dataCurrent: this.strategicData.normalCapacityCurrent, dataAverage: this.strategicData.normalCapacityAverage},
      {label: 'dynamicData.possibleCapacity', dataCurrent: this.strategicData.possibleCapacityCurrent, dataAverage: this.strategicData.possibleCapacityAverage},
      {label: 'dynamicData.posNormCapacity', dataCurrent: this.strategicData.relPossibleNormalCapacityCurrent, dataAverage: this.strategicData.relPossibleNormalCapacityAverage},
      {label: 'dynamicData.productiveTime', dataCurrent: this.strategicData.productiveTimeCurrent, dataAverage: this.strategicData.productiveTimeAverage},
      {label: 'dynamicData.efficiency', dataCurrent: this.strategicData.effiencyCurrent, dataAverage: this.strategicData.effiencyAverage},
      {label: 'dynamicData.sellwish', dataCurrent: this.strategicData.sellwishCurrent, dataAverage: this.strategicData.sellwishAverage},
      {label: 'dynamicData.sales', dataCurrent: this.strategicData.salesQuantityCurrent, dataAverage: this.strategicData.sellwishAverage},
      {label: 'dynamicData.idleTime', dataCurrent: this.strategicData.idleTimeCurrent, dataAverage: this.strategicData.idleTimeAverage},
      {label: 'dynamicData.idleTimeCosts', dataCurrent: this.strategicData.idleTimeCostsCurrent, dataAverage: this.strategicData.idleTimeCostsAverage},
      {label: 'dynamicData.stockvalue', dataCurrent: this.strategicData.storeValueCurrent, dataAverage: this.strategicData.storeValueAverage},
      {label: 'dynamicData.storageCosts', dataCurrent: this.strategicData.storageCostsCurrent, dataAverage: this.strategicData.storageCostsAverage}
    ];
  }

  // Updates the data source for the inward stockmovement table with data from the database.
  updatefutureInwardStockMovementsDataSource() {
    this.futureInwardStockMovements.forEach(futureInwardStockMovement => {
      let orderMode = "";
      if(futureInwardStockMovement.mode === 4) {
        orderMode = "Eil"
      } else if(futureInwardStockMovement.mode) {
        orderMode = "Normal"
      }
      let futureInwardStockMovementsDataSourceEntry: FutureInwardStockMovementTableElement = {
        article: futureInwardStockMovement.article,
        arrivingPeriod: futureInwardStockMovement.arrivingPeriod,
        mode: orderMode,
        amount: futureInwardStockMovement.amount
      }
      this.futureInwardStockMovementsDataSource.push(futureInwardStockMovementsDataSourceEntry);
    })
  }

  // Updates the data source for the warehousestock with data from the database.
  updateWareHouseStockDataSource() {
    this.articles.forEach(article => {
      let warehousestockentry: WareHouseStock = {
        article: article.id,
        amount: article.amount,
        price: article.price.toFixed(2),
        value: (article.amount * article.price).toFixed(2),
      }
      this.wareHouseStockDataSource.push(warehousestockentry);
    })
  }

  // Updates the data source for the queues with data from the database.
  updateQueuesDataSources() {
    this.queues.forEach(queue => {
      if(queue.inwork === true) {
        this.queuesInWorkDataSource.push(queue);
      } else if(queue.inwork === false) {
        this.queuesNotInWorkDataSource.push(queue);
      }
      // Each case represents a workstation.
      switch(queue.workstation) {
        case 1:
          this.capacityPerWorkStation[0].capacity += queue.time;
          break;
        case 2:
          this.capacityPerWorkStation[1].capacity += queue.time;
          break;
        case 3:
          this.capacityPerWorkStation[2].capacity += queue.time;
          break;
        case 4:
          this.capacityPerWorkStation[3].capacity += queue.time;
          break;
        case 6:
          this.capacityPerWorkStation[4].capacity += queue.time;
          break;
        case 7:
          this.capacityPerWorkStation[5].capacity += queue.time;
          break;
        case 8:
          this.capacityPerWorkStation[6].capacity += queue.time;
          break;
        case 9:
          this.capacityPerWorkStation[7].capacity += queue.time;
          break;
        case 10:
          this.capacityPerWorkStation[8].capacity += queue.time;
          break;
        case 11:
          this.capacityPerWorkStation[9].capacity += queue.time;
          break;
        case 12:
          this.capacityPerWorkStation[10].capacity += queue.time;
          break;
        case 13:
          this.capacityPerWorkStation[11].capacity += queue.time;
          break;
        case 14:
          this.capacityPerWorkStation[12].capacity += queue.time;
          break;
        case 15:
          this.capacityPerWorkStation[13].capacity += queue.time;
          break;
      }
    });

  }
}
