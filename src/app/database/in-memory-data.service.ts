import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Forecast } from '../models/forecast';
import { BillOfMaterials } from '../models/billOfMaterials';
import { Article } from '../models/article';
import { FutureInwardStockMovement } from '../models/futureInwardStockMovement';
import { Workstation } from '../models/workstation';
import { Queue } from '../models/queue';
import { Capacity } from '../models/capacity';
import { Order } from '../models/order';
import { Purchase } from '../models/purchase';
import { DirectSales } from '../models/directSales';
import { StrategicData } from '../models/strategicData';
import { IdleTimeCost } from '../models/idleTimeCost';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const billsOfMaterials: BillOfMaterials[] = [];
    const forecasts: Forecast[] = [];
    const articles: Article[] = [];
    const futureInwardStockMovements: FutureInwardStockMovement[] = [];
    const workstations: Workstation[] = [];
    const queues: Queue[] = [];
    const capacities: Capacity[] = [];
    const orders: Order[] = [];
    const purchases: Purchase[] = [];
    const directSales: DirectSales[] = [];
    const strategicDatas: StrategicData[] = [];
    const idleTimeCosts: IdleTimeCost[] = [];
    return {
      billsOfMaterials,
      forecasts,
      articles,
      futureInwardStockMovements,
      workstations,
      queues,
      capacities,
      orders,
      purchases,
      directSales,
      strategicDatas,
      idleTimeCosts,
    };
  }
}
