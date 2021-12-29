import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Forecast } from 'src/app/models/forecast';
import { ProdPlanToolService } from 'src/app/prod-plan-tool.service';
import { Workstation } from '../models/workstation';
import {Queue} from "../models/queue";
import { Order } from 'src/app/models/order';
import { BillsOfMaterials } from '../shared/billsOfMaterials';
import { MaterialPlanningTableComponent } from './material-planning-table/material-planning-table.component'
import { ProcessNavbarComponent } from '../process-navbar/process-navbar.component';

interface OrderType {
  value: string;
  viewValue: string;
}
export interface MaterialPlanningElement {
  article: number
  orderCosts: number;
  currentRequirements: number;
  deliveryTime: number;
  discountQuantity: number;
  currentStock: number;
  deviation: number;
  price: string;
  orderQuantity: number;
  orderType: string;
  forecastRequirementsN1: number;
  forecastRequirementsN2: number;
  forecastRequirementsN3: number;
  // tslint:disable-next-line:jsdoc-format
  /** id: number; ;  productionTime: number; capacity: number;*/
}


const ELEMENT_DATA: MaterialPlanningElement[] = [
  { article: 21, deliveryTime: 1.8, deviation: 0.4, discountQuantity: 300, price: '$5.00', orderCosts: 50.00, currentStock: 0, currentRequirements: 0, forecastRequirementsN1: 2, forecastRequirementsN2: 1, forecastRequirementsN3: 1, orderQuantity: 0, orderType: "Normal",
  },
  {
    article: 22,
    deliveryTime: 2460,
    deviation: 60,
    discountQuantity: 0,
    price: '$5.00',
    orderCosts: 4000,
    currentStock: 0,
    currentRequirements: 0,
    forecastRequirementsN1: 2,
    forecastRequirementsN2: 1,
    forecastRequirementsN3: 1,
    orderQuantity: 0,
    orderType: "normal",
  },


];

@Component({
  selector: 'app-material-planning',
  templateUrl: './material-planning.component.html',
  styleUrls: ['./material-planning.component.css', '../app.component.css']
})


export class MaterialPlanningComponent implements OnInit {
  displayedColumns: string[] = [
    'article',
    'deliveryTime',
    'deviation',
    'discountQuantity',
    'price',
    'orderCosts',
    'currentStock',
    'currentRequirements', // order
    'forecastRequirementsN1',
    'forecastRequirementsN2',
    'forecastRequirementsN3',
    'orderQuantity',
    'orderType',
  ];
  dataSource = ELEMENT_DATA;
  forecasts: Forecast[];
  workstations: Workstation[];
  queues: Queue[];
  orders: Order[];
  orderTypes2: OrderType[] = [
    {value: 'n', viewValue: 'materialPlanning.normal'},
    {value: 'f', viewValue: 'materialPlanning.fast'},
  ];
  loadedForecast: Promise<boolean>;
  loadedArticle: Promise<boolean>;
  loadedWorkstations: Promise<boolean>;
  loadedQueue: Promise<boolean>;
  loadedOrder: Promise<boolean>;

  constructor(private prodPlanToolService: ProdPlanToolService) {
    ProcessNavbarComponent.export = true;
  }

  ngOnInit() {
    this.getAndSetData();
  }

  getAndSetData() {
    // getOrders
    this.prodPlanToolService.getOrders().subscribe((orders) => {
      this.orders = orders;

      // getForecast
      this.prodPlanToolService.getForecasts().subscribe((forcasts) => {
        this.forecasts = forcasts;

          // getQueues
          this.prodPlanToolService.getQueues().subscribe((queues) => {
            this.queues = queues;
            this.updateDataSource();
            //this.updateCapacitiesInDatabase();
            // getWorkstations
              });

        });
      });
  }

  getForecasts() {
    this.prodPlanToolService.getForecasts()
      .subscribe(forecasts => {
        this.forecasts = forecasts;
      });
  }

  getWorkstations() {
    this.prodPlanToolService.getWorkstations()
      .subscribe(workstations => {
        this.workstations = workstations;
      });
  }

  getQueues() {
    this.prodPlanToolService.getQueues()
      .subscribe(queues => {
        this.queues = queues;
      });
  }
  getOrders() {
    this.prodPlanToolService.getOrders()
      .subscribe(orders => {
        this.orders = orders;
      });
  }

  // updateCapacitiesInDatabase() {
  //   for (let i = 0; i < 14; i++) {
  //     let material: BillsOfMaterials = {
  //       id: this.dataSource[i].workstation,
  //       workstation: this.dataSource[i].workstation,
  //     };
  //     this.updateCapacity(capacity);
  //   }
  //   this.updateDataSource();
  // }

  updateDataSource() {
    // this.dataSource[0].currentStock = this.orders[0].stockvalue;
    // let article21 = this.orders.find((orders) => orders.article === 21);
    // this.dataSource[0].currentRequirements = article21.stockvalue;

    // let x;

    // for (x = 0; x < 14; x++) {
    //  // this.dataSource[x].totalCapacityRequirements = this.dataSource[x].capacityRequirements + this.dataSource[x].capacityRequirementsBacklog + this.dataSource[x].setupTime + this.dataSource[x].setupTime;

    // }




  }
}
