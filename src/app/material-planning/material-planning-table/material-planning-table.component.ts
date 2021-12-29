import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Forecast } from 'src/app/models/forecast';
import { ProdPlanToolService } from 'src/app/prod-plan-tool.service';
import { DynamicDataComponent } from 'src/app/dynamic-data/dynamic-data.component';
import { Workstation } from '../../models/workstation';
import { Queue } from '../../models/queue';
import { Order } from 'src/app/models/order';
import { BillsOfMaterials } from '../../shared/billsOfMaterials';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BillOfMaterials } from 'src/app/models/billOfMaterials';
import { Purchase } from 'src/app/models/purchase';
import { ProcessNavbarComponent } from 'src/app/process-navbar/process-navbar.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MaterialPlanningElement } from '../material-planning.component';
import { FutureInwardStockMovement } from 'src/app/models/futureInwardStockMovement'

@Component({
  selector: 'app-material-planning-table',
  templateUrl: './material-planning-table.component.html',
  styleUrls: ['./material-planning-table.component.css' ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class MaterialPlanningTableComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = [
    'article',
    'discount',
    'price',
    'currentStock',
    'currentConsumption',
    'forecastn1',
    'forecastn2',
    'forecastn3',
  ];
  expandedElement: MaterialPlanningTableElement | null;
  forecasts: Forecast[];
  workstations: Workstation[];
  queues: Queue[];
  orders: Order[];
  loadedForecast: Promise<boolean>;
  loadedArticle: Promise<boolean>;
  loadedWorkstations: Promise<boolean>;
  loadedQueue: Promise<boolean>;
  loadedOrder: Promise<boolean>;
  articles: Article[];
  orderQuantity: number;
  futureInwardStockMovements: FutureInwardStockMovement[];
  displayedColumnsFutureInwardStockMovement: DynamicDataComponent[];
  period : number;


  constructor(private prodPlanToolService: ProdPlanToolService, private spinner: NgxSpinnerService) {
    ProcessNavbarComponent.export = true;
  }

  ngOnInit() {
    
      this.getAndSetData();
    
  }

  getAndSetData() {

    
    // getOrders
    this.prodPlanToolService.getOrders().subscribe((orders) => {
      this.orders = orders;
      console.log(this.orders);
      // getOrders
      this.prodPlanToolService.getArticles().subscribe((articles) => {
        this.articles = articles;
        console.log(this.articles);

        // getForecast
        this.prodPlanToolService.getForecasts().subscribe((forecasts) => {
          this.forecasts = forecasts;
          
        // getFutureInw
        this.prodPlanToolService.getFutureInwardStockMovements().subscribe((futureInwardStockMovements) => {
          this.futureInwardStockMovements = futureInwardStockMovements;

          // getQueues
          this.prodPlanToolService.getQueues().subscribe((queues) => {
            this.queues = queues;


            this.updateDataSource();
            
            //this.updateCapacitiesInDatabase();
            // getWorkstations
          });
        });
        });
      });
    });
  }

  

  getForecasts() {
    this.prodPlanToolService.getForecasts().subscribe((forecasts) => {
      this.forecasts = forecasts;
    });
  }

  getWorkstations() {
    this.prodPlanToolService.getWorkstations().subscribe((workstations) => {
      this.workstations = workstations;
    });
  }

  getQueues() {
    this.prodPlanToolService.getQueues().subscribe((queues) => {
      this.queues = queues;
    });
  }
  getOrders() {
    this.prodPlanToolService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  checkQueue(inQueue: Queue) {
    if(inQueue == null) return 0;
    return inQueue.amount;
  }
  updatePurchase(purchase: Purchase) {
    this.prodPlanToolService.updatePurchase(purchase).subscribe();
  }

  updateOrderQuantity(row) {
    // Checks if orderQuantity  has been changed.
    console.log(row);
    console.log(row.article);



    this.orderQuantity = parseInt(row.orderQuantity);

    const purchase = {
      id: row.article,
      article: row.article,
      amount: row.orderQuantity,
      type: 5,
    };

    console.log(purchase);
    this.updatePurchase(purchase);

    //ID bestimmen
    let i = 0;
    switch(purchase.id){
      case 21: i = 0;
      break;
      case 22: i = 1;
      break;
      case 23: i = 2;
      break;
      case 24: i = 3;
      break;
      case 25: i = 4;
      break;
      case 27: i = 5;
      break;
      case 28: i = 6;
      break;
      case 32: i = 7;
      break;
      case 33: i = 8;
      break;
      case 34: i = 9;
      break;
      case 35: i = 10;
      break;
      case 36: i = 11;
      break;
      case 37: i = 12;
      break;
      case 38: i = 13;
      break;
      case 39: i = 14;
      break;
      case 40: i = 15;
      break;
      case 41: i = 16;
      break;
      case 42: i = 17;
      break;
      case 43: i = 18;
      break;
      case 44: i = 19;
      break;
      case 45: i = 20;
      break;
      case 46: i = 21;
      break;
      case 47: i = 22;
      break;
      case 48: i = 23;
      break;
      case 52: i = 24;
      break;
      case 53: i = 25;
      break;
      case 57: i = 26;
      break;
      case 58: i = 27;
      break;
      case 59: i = 28;
      break;
    }


    if(purchase.amount>0 && purchase.amount <= this.dataSource[i].discount ){
      this.dataSource[i].gesamtkosten = this.dataSource[i].orderCosts + purchase.amount * this.dataSource[i].price ;
    };
    if(purchase.amount >= this.dataSource[i].discount){
      this.dataSource[i].gesamtkosten = (this.dataSource[i].orderCosts + purchase.amount * this.dataSource[i].price) * 0.9;
    };

    if(purchase.amount === 0){
      this.dataSource[i].gesamtkosten = 0;
    }


      if(this.dataSource[i].deliveryTimeN < 0.85 ){
        this.dataSource[i].ordersPeriodN = purchase.amount; 
      }
      if(this.dataSource[i].deliveryTimeN < 1.85 && this.dataSource[i].deliveryTimeN >= 0.85 ){
        this.dataSource[i].ordersPeriodN1 = purchase.amount; 
      }

      if(this.dataSource[i].deliveryTimeN < 2.85 && this.dataSource[i].deliveryTimeN >= 1.85 ){
        this.dataSource[i].ordersPeriodN2 = purchase.amount; 
      }
      if(this.dataSource[i].deliveryTimeN < 3.85 && this.dataSource[i].deliveryTimeN >= 2.85 ){
        this.dataSource[i].ordersPeriodN3 = purchase.amount; 
      }

    this.updateDataSource();
  }

  updateOrderQuantityE(row) {
    // Checks if orderQuantity  has been changed.
   

    this.orderQuantity = parseInt(row.orderQuantity);

    const purchase = {
      id: row.article + 40,
      article: row.article,
      amount: row.orderQuantityE,
      type: 4,
    };

    console.log(purchase);
    this.updatePurchase(purchase);
        //ID bestimmen
        let i = 0;
        switch(purchase.article){
          case 21: i = 0;
          break;
          case 22: i = 1;
          break;
          case 23: i = 2;
          break;
          case 24: i = 3;
          break;
          case 25: i = 4;
          break;
          case 27: i = 5;
          break;
          case 28: i = 6;
          break;
          case 32: i = 7;
          break;
          case 33: i = 8;
          break;
          case 34: i = 9;
          break;
          case 35: i = 10;
          break;
          case 36: i = 11;
          break;
          case 37: i = 12;
          break;
          case 38: i = 13;
          break;
          case 39: i = 14;
          break;
          case 40: i = 15;
          break;
          case 41: i = 16;
          break;
          case 42: i = 17;
          break;
          case 43: i = 18;
          break;
          case 44: i = 19;
          break;
          case 45: i = 20;
          break;
          case 46: i = 21;
          break;
          case 47: i = 22;
          break;
          case 48: i = 23;
          break;
          case 52: i = 24;
          break;
          case 53: i = 25;
          break;
          case 57: i = 26;
          break;
          case 58: i = 27;
          break;
          case 59: i = 28;
          break;
        }

        if(purchase.amount>0 && purchase.amount <= this.dataSource[i].discount ){
          this.dataSource[i].gesamtkostenE = (this.dataSource[i].orderCosts*10) + purchase.amount * this.dataSource[i].price ;
        };
        if(purchase.amount >= this.dataSource[i].discount){
          this.dataSource[i].gesamtkostenE = ((this.dataSource[i].orderCosts*10) + purchase.amount * this.dataSource[i].price) * 0.9;
        };

        if(purchase.amount === 0){
          this.dataSource[i].gesamtkostenE = 0;
        }

        if(((this.dataSource[i].deliveryTimeN) /2) < 0.85 ){
          this.dataSource[i].ordersPeriodNE = purchase.amount; 
        }
        if(((this.dataSource[i].deliveryTimeN) /2) < 1.85 && ((this.dataSource[i].deliveryTimeN) /2) >= 0.85 ){
          this.dataSource[i].ordersPeriodN1E = purchase.amount; 
        }
  
        if(((this.dataSource[i].deliveryTimeN) /2) < 2.85 && ((this.dataSource[i].deliveryTimeN) /2) >= 1.85 ){
          this.dataSource[i].ordersPeriodN2E = purchase.amount; 
        }
        if(((this.dataSource[i].deliveryTimeN) /2) < 3.85 && ((this.dataSource[i].deliveryTimeN) /2) >= 2.85 ){
          this.dataSource[i].ordersPeriodN3E = purchase.amount; 
        }
        this.updateDataSource();
  }



  updateDataSource() {

    
    


    //forecast N1

    //#region Forecast n1

    //Produkt 1
    let forecast1Product1 = this.forecasts[1].article1;
    console.log(forecast1Product1);
    let pss1 = this.forecasts[1].pss1;
    let forecast1Article1 = forecast1Product1 + pss1;
    //Mehrfachartikel 26
    let forecast1Article26p1 = forecast1Article1 + pss1;
    let forecast1Article51 = forecast1Article1 + pss1;
    //Mehrfachartikel 16
    let forecast1Article16p1 =  forecast1Article1 + pss1;
    //Mehrfachartikel 17
    let forecast1Article17p1 = forecast1Article1 + pss1;
    let forecast1Article50 = forecast1Article51 + pss1;
    let forecast1Article4 = forecast1Article50 + pss1;
    let forecast1Article10 = forecast1Article50 + pss1;
    let forecast1Article49 = forecast1Article50 + pss1;
    let forecast1Article7 = forecast1Article49 + pss1;
    let forecast1Article13 = forecast1Article49 + pss1;
    let forecast1Article18 = forecast1Article49 + pss1;

    //Produkt 2
    let forecast1Product2 = this.forecasts[1].article2;
    let pss2 = this.forecasts[1].pss2;
    let forecast1Article2 = forecast1Product2 + pss2;
    //Mehrfachartikel 26
    let forecast1Article26p2 = forecast1Article2 + pss2;
    let forecast1Article56 = forecast1Article2 + pss2;
    //Mehrfachartikel 16
    let forecast1Article16p2 = forecast1Article56 + pss2;
    //Mehrfachartikel 17
    let forecast1Article17p2 = forecast1Article56 + pss2;
    let forecast1Article55 = forecast1Article56 + pss2;
    let forecast1Article5 = forecast1Article55 + pss2;
    let forecast1Article11 = forecast1Article55 + pss2;
    let forecast1Article54 = forecast1Article55 + pss2;
    let forecast1Article8 = forecast1Article54 + pss2;
    let forecast1Article14 = forecast1Article54 + pss2;
    let forecast1Article19 = forecast1Article54 + pss2;


    //Produkt 3
    let forecast1Product3 = this.forecasts[1].article3;
    let pss3 = this.forecasts[1].pss3;
    let forecast1Article3 = forecast1Product3 + pss3;
    //Mehrfachartikel 26
    let forecast1Article26p3 = forecast1Article3 + pss3;
    let forecast1Article31 = forecast1Article3 + pss3;
    //Mehrfachartikel 16
    let forecast1Article16p3 = forecast1Article31 + pss3;
    //Mehrfachartikel 17
    let forecast1Article17p3 = forecast1Article31 + pss3;
    let forecast1Article30 = forecast1Article56 + pss3;
    let forecast1Article6 = forecast1Article30 + pss3;
    let forecast1Article12 = forecast1Article30 + pss3;
    let forecast1Article29 = forecast1Article30 + pss3;
    let forecast1Article9 = forecast1Article29 + pss3;
    let forecast1Article15 = forecast1Article29 + pss3;
    let forecast1Article20 = forecast1Article29 + pss3;

    //Kaufteile

    //21
    this.dataSource[0].forecastn1 = forecast1Article1;
    //22
    this.dataSource[1].forecastn1 = forecast1Article2;
    //23
    this.dataSource[2].forecastn1 = forecast1Article3;
    //24
    let p1k24 = 2 * forecast1Article49 + 1 * forecast1Article16p1 + 2 * forecast1Article50 + 1 * forecast1Article51 + 1 * forecast1Article1;
    let p2k24 = 2 * forecast1Article54 + 1 * forecast1Article16p2 + 2 * forecast1Article55 + 1 * forecast1Article56 + 1 * forecast1Article2;
    let p3k24 = 2 * forecast1Article29 + 1 * forecast1Article16p3 + 2 * forecast1Article30 + 1 * forecast1Article31 + 1 * forecast1Article3;
    this.dataSource[3].forecastn1 = p1k24 + p2k24 + p3k24;
    //25
    let p1k25 = 2 * forecast1Article49 + 2 * forecast1Article50 ;
    let p2k25 = 2 * forecast1Article54 + 2 * forecast1Article55 ;
    let p3k25 = 2 * forecast1Article29 + 2 * forecast1Article30 ;
    this.dataSource[4].forecastn1 = p1k25 + p2k25 + p3k25;
    //27
    let p1k27 = forecast1Article51 + forecast1Article1 ;
    let p2k27 = forecast1Article56 + forecast1Article2 ;
    let p3k27 = forecast1Article31 + forecast1Article3 ;
    this.dataSource[5].forecastn1 = p1k27 + p2k27 + p3k27;
    //28
    let p1k28 = 3 * forecast1Article18 + forecast1Article16p1 ;
    let p2k28 = 4 * forecast1Article19 + forecast1Article16p2 ;
    let p3k28 = 5 * forecast1Article20 + forecast1Article16p3 ;
    this.dataSource[6].forecastn1 = p1k28 + p2k28 + p3k28;
    //32
    let p1k32 = forecast1Article13 + forecast1Article18 + forecast1Article10 ;
    let p2k32 = forecast1Article14 + forecast1Article19 + forecast1Article11 ;
    let p3k32 = forecast1Article15 + forecast1Article20 + forecast1Article12 ;
    this.dataSource[7].forecastn1 = p1k32 + p2k32 + p3k32;
    //33
    this.dataSource[8].forecastn1 = forecast1Article9 + forecast1Article6;
    //34
    this.dataSource[9].forecastn1 = 36 * forecast1Article9 + 36 * forecast1Article6;
    //35
    let p1k35 = 2 * forecast1Article7 + 2 * forecast1Article4 ;
    let p2k35 = 2 * forecast1Article8 + 2 * forecast1Article5 ;
    let p3k35 = 2 * forecast1Article9 + 2 * forecast1Article6 ;
    this.dataSource[10].forecastn1 = p1k35 + p2k35 + p3k35;
    //36
    this.dataSource[11].forecastn1 = forecast1Article4 + forecast1Article5 + forecast1Article6;
    //37
    this.dataSource[12].forecastn1 = forecast1Article7 + forecast1Article8 + forecast1Article9;
    //38
    this.dataSource[13].forecastn1 = forecast1Article7 + forecast1Article8 + forecast1Article9;
    //39
    let p1k39 = forecast1Article13 + forecast1Article10;
    let p2k39 = forecast1Article14 + forecast1Article11;
    let p3k39 = forecast1Article15 + forecast1Article12;
    this.dataSource[14].forecastn1 = p1k39 + p2k39 + p3k39;
    //40
    this.dataSource[15].forecastn1 = forecast1Article16p1 + forecast1Article16p2 + forecast1Article16p3;
    //41
    this.dataSource[16].forecastn1 = forecast1Article16p1 + forecast1Article16p2 + forecast1Article16p3;
    //42
    this.dataSource[17].forecastn1 = 2 * forecast1Article16p1 + 2 * forecast1Article16p2 + 2 * forecast1Article16p3;
    //43
    this.dataSource[18].forecastn1 = forecast1Article17p1 + forecast1Article17p2 + forecast1Article17p3;
    //44
    let p1k44 = forecast1Article17p1 + forecast1Article1;
    let p2k44 = forecast1Article17p2 + forecast1Article2;
    let p3k44 = forecast1Article17p3 + forecast1Article3;
    this.dataSource[19].forecastn1 = p1k44 + p2k44 + p3k44;
    //45
    this.dataSource[20].forecastn1 = forecast1Article17p1 + forecast1Article17p2 + forecast1Article17p3;
    //46
    this.dataSource[21].forecastn1 = forecast1Article17p1 + forecast1Article17p2 + forecast1Article17p3;
    //47
    this.dataSource[22].forecastn1 = forecast1Article26p1 + forecast1Article26p2 + forecast1Article26p3;
    //48
    this.dataSource[23].forecastn1 = 2 * forecast1Article26p1 + 2 * forecast1Article26p2 + 2 * forecast1Article26p3;
    //52
    this.dataSource[24].forecastn1 = forecast1Article4 + forecast1Article7;
    //53
    this.dataSource[25].forecastn1 = 36 * forecast1Article4 + 36 * forecast1Article7;
    //57
    this.dataSource[26].forecastn1 = forecast1Article5 + forecast1Article8;
    //58
    this.dataSource[27].forecastn1 = 36 * forecast1Article5 + 36 * forecast1Article8;
    //59
    this.dataSource[28].forecastn1 = 2 * forecast1Article18 + 2 * forecast1Article19 + 2 * forecast1Article20;

    //#endregion

    //#region Forecast N2
    //Produkt 1
    let forecast2Product1 = this.forecasts[2].article1;
    let forecast2pss1 = this.forecasts[2].pss1;
    let forecast2Article1 = forecast2Product1 + forecast2pss1;
    //Mehrfachartikel 26
    let forecast2Article26p1 = forecast2Article1 + forecast2pss1;
    let forecast2Article51 = forecast2Article1 + forecast2pss1;
    //Mehrfachartikel 16
    let forecast2Article16p1 =  forecast2Article1 + forecast2pss1;
    //Mehrfachartikel 17
    let forecast2Article17p1 = forecast2Article1 + forecast2pss1;
    let forecast2Article50 = forecast2Article51 + forecast2pss1;
    let forecast2Article4 = forecast2Article50 + forecast2pss1;
    let forecast2Article10 = forecast2Article50 + forecast2pss1;
    let forecast2Article49 = forecast2Article50 + forecast2pss1;
    let forecast2Article7 = forecast2Article49 + forecast2pss1;
    let forecast2Article13 = forecast2Article49 + forecast2pss1;
    let forecast2Article18 = forecast2Article49 + forecast2pss1;

    //Produkt 2
    let forecast2Product2 = this.forecasts[2].article2;
    let forecast2pss2 = this.forecasts[2].pss2;
    let forecast2Article2 = forecast2Product2 + forecast2pss2;
    //Mehrfachartikel 26
    let forecast2Article26p2 = forecast2Article2 + forecast2pss2;
    let forecast2Article56 = forecast2Article2 + forecast2pss2;
    //Mehrfachartikel 16
    let forecast2Article16p2 = forecast2Article56 + forecast2pss2;
    //Mehrfachartikel 17
    let forecast2Article17p2 = forecast2Article56 + forecast2pss2;
    let forecast2Article55 = forecast2Article56 + forecast2pss2;
    let forecast2Article5 = forecast2Article55 + forecast2pss2;
    let forecast2Article11 = forecast2Article55 + forecast2pss2;
    let forecast2Article54 = forecast2Article55 + forecast2pss2;
    let forecast2Article8 = forecast2Article54 + forecast2pss2;
    let forecast2Article14 = forecast2Article54 + forecast2pss2;
    let forecast2Article19 = forecast2Article54 + forecast2pss2;


    //Produkt 3
    let forecast2Product3 = this.forecasts[2].article3;
    let forecast2pss3 = this.forecasts[2].pss3;
    let forecast2Article3 = forecast2Product3 + forecast2pss3;
    //Mehrfachartikel 26
    let forecast2Article26p3 = forecast2Article3 + forecast2pss3;
    let forecast2Article31 = forecast2Article3 + forecast2pss3;
    //Mehrfachartikel 16
    let forecast2Article16p3 = forecast2Article31 + forecast2pss3;
    //Mehrfachartikel 17
    let forecast2Article17p3 = forecast2Article31 + forecast2pss3;
    let forecast2Article30 = forecast2Article56 + forecast2pss3;
    let forecast2Article6 = forecast2Article30 + forecast2pss3;
    let forecast2Article12 = forecast2Article30 + forecast2pss3;
    let forecast2Article29 = forecast2Article30 + forecast2pss3;
    let forecast2Article9 = forecast2Article29 + forecast2pss3;
    let forecast2Article15 = forecast2Article29 + forecast2pss3;
    let forecast2Article20 = forecast2Article29 + forecast2pss3;

    //Kaufteile

    //21
    this.dataSource[0].forecastn2 = forecast2Article1;
    //22
    this.dataSource[1].forecastn2 = forecast2Article2;
    //23
    this.dataSource[2].forecastn2 = forecast2Article3;
    //24
    let f2p1k24 = 2 * forecast2Article49 + 1 * forecast2Article16p1 + 2 * forecast2Article50 + 1 * forecast2Article51 + 1 * forecast2Article1;
    let f2p2k24 = 2 * forecast2Article54 + 1 * forecast2Article16p2 + 2 * forecast2Article55 + 1 * forecast2Article56 + 1 * forecast2Article2;
    let f2p3k24 = 2 * forecast2Article29 + 1 * forecast2Article16p3 + 2 * forecast2Article30 + 1 * forecast2Article31 + 1 * forecast2Article3;
    this.dataSource[3].forecastn2 = f2p1k24 + f2p2k24 + f2p3k24;
    //25
    let f2p1k25 = 2 * forecast2Article49 + 2 * forecast2Article50 ;
    let f2p2k25 = 2 * forecast2Article54 + 2 * forecast2Article55 ;
    let f2p3k25 = 2 * forecast2Article29 + 2 * forecast2Article30 ;
    this.dataSource[4].forecastn2 = f2p1k25 + f2p2k25 + f2p3k25;
    //27
    let f2p1k27 = forecast2Article51 + forecast2Article1 ;
    let f2p2k27 = forecast2Article56 + forecast2Article2 ;
    let f2p3k27 = forecast2Article31 + forecast2Article3 ;
    this.dataSource[5].forecastn2 = f2p1k27 + f2p2k27 + f2p3k27;
    //28
    let f2p1k28 = 3 * forecast2Article18 + forecast2Article16p1 ;
    let f2p2k28 = 4 * forecast2Article19 + forecast2Article16p2 ;
    let f2p3k28 = 5 * forecast2Article20 + forecast2Article16p3 ;
    this.dataSource[6].forecastn2 = f2p1k28 + f2p2k28 + f2p3k28;
    //32
    let f2p1k32 = forecast2Article13 + forecast2Article18 + forecast2Article10 ;
    let f2p2k32 = forecast2Article14 + forecast2Article19 + forecast2Article11 ;
    let f2p3k32 = forecast2Article15 + forecast2Article20 + forecast2Article12 ;
    this.dataSource[7].forecastn2 = f2p1k32 + f2p2k32 + f2p3k32;
    //33
    this.dataSource[8].forecastn2 = forecast2Article9 + forecast2Article6;
    //34
    this.dataSource[9].forecastn2 = 36 * forecast2Article9 + 36 * forecast2Article6;
    //35
    let f2p1k35 = 2 * forecast2Article7 + 2 * forecast2Article4 ;
    let f2p2k35 = 2 * forecast2Article8 + 2 * forecast2Article5 ;
    let f2p3k35 = 2 * forecast2Article9 + 2 * forecast2Article6 ;
    this.dataSource[10].forecastn2 = f2p1k35 + f2p2k35 + f2p3k35;
    //36
    this.dataSource[11].forecastn2 = forecast2Article4 + forecast2Article5 + forecast2Article6;
    //37
    this.dataSource[12].forecastn2 = forecast2Article7 + forecast2Article8 + forecast2Article9;
    //38
    this.dataSource[13].forecastn2 = forecast2Article7 + forecast2Article8 + forecast2Article9;
    //39
    let f2p1k39 = forecast2Article13 + forecast2Article10;
    let f2p2k39 = forecast2Article14 + forecast2Article11;
    let f2p3k39 = forecast2Article15 + forecast2Article12;
    this.dataSource[14].forecastn2 = f2p1k39 + f2p2k39 + f2p3k39;
    //40
    this.dataSource[15].forecastn2 = forecast2Article16p1 + forecast2Article16p2 + forecast2Article16p3;
    //41
    this.dataSource[16].forecastn2 = forecast2Article16p1 + forecast2Article16p2 + forecast2Article16p3;
    //42
    this.dataSource[17].forecastn2 = 2 * forecast2Article16p1 + 2 * forecast2Article16p2 + 2 * forecast2Article16p3;
    //43
    this.dataSource[18].forecastn2 = forecast2Article17p1 + forecast2Article17p2 + forecast2Article17p3;
    //44
    let f2p1k44 = forecast2Article17p1 + forecast2Article1;
    let f2p2k44 = forecast2Article17p2 + forecast2Article2;
    let f2p3k44 = forecast2Article17p3 + forecast2Article3;
    this.dataSource[19].forecastn2 = f2p1k44 + f2p2k44 + f2p3k44;
    //45
    this.dataSource[20].forecastn2 = forecast2Article17p1 + forecast2Article17p2 + forecast2Article17p3;
    //46
    this.dataSource[21].forecastn2 = forecast2Article17p1 + forecast2Article17p2 + forecast2Article17p3;
    //47
    this.dataSource[22].forecastn2 = forecast2Article26p1 + forecast2Article26p2 + forecast2Article26p3;
    //48
    this.dataSource[23].forecastn2 = 2 * forecast2Article26p1 + 2 * forecast2Article26p2 + 2 * forecast2Article26p3;
    //52
    this.dataSource[24].forecastn2 = forecast2Article4 + forecast2Article7;
    //53
    this.dataSource[25].forecastn2 = 36 * forecast2Article4 + 36 * forecast2Article7;
    //57
    this.dataSource[26].forecastn2 = forecast2Article5 + forecast2Article8;
    //58
    this.dataSource[27].forecastn2 = 36 * forecast2Article5 + 36 * forecast2Article8;
    //59
    this.dataSource[28].forecastn2 = 2 * forecast2Article18 + 2 * forecast2Article19 + 2 * forecast2Article20;

    //#endregion

    //#region Forecast N3
    //Produkt 1
    let forecast3Product1 = this.forecasts[3].article1;
    let forecast3pss1 = this.forecasts[3].pss1;
    let forecast3Article1 = forecast3Product1 + forecast3pss1;
    //Mehrfachartikel 26
    let forecast3Article26p1 = forecast3Article1 + forecast3pss1;
    let forecast3Article51 = forecast3Article1 + forecast3pss1;
    //Mehrfachartikel 16
    let forecast3Article16p1 =  forecast3Article1 + forecast3pss1;
    //Mehrfachartikel 17
    let forecast3Article17p1 = forecast3Article1 + forecast3pss1;
    let forecast3Article50 = forecast3Article51 + forecast3pss1;
    let forecast3Article4 = forecast3Article50 + forecast3pss1;
    let forecast3Article10 = forecast3Article50 + forecast3pss1;
    let forecast3Article49 = forecast3Article50 + forecast3pss1;
    let forecast3Article7 = forecast3Article49 + forecast3pss1;
    let forecast3Article13 = forecast3Article49 + forecast3pss1;
    let forecast3Article18 = forecast3Article49 + forecast3pss1;

    //Produkt 2
    let forecast3Product2 = this.forecasts[3].article2;
    let forecast3pss2 = this.forecasts[3].pss2;
    let forecast3Article2 = forecast3Product2 + forecast3pss2;
    //Mehrfachartikel 26
    let forecast3Article26p2 = forecast3Article2 + forecast3pss2;
    let forecast3Article56 = forecast3Article2 + forecast3pss2;
    //Mehrfachartikel 16
    let forecast3Article16p2 = forecast3Article56 + forecast3pss2;
    //Mehrfachartikel 17
    let forecast3Article17p2 = forecast3Article56 + forecast3pss2;
    let forecast3Article55 = forecast3Article56 + forecast3pss2;
    let forecast3Article5 = forecast3Article55 + forecast3pss2;
    let forecast3Article11 = forecast3Article55 + forecast3pss2;
    let forecast3Article54 = forecast3Article55 + forecast3pss2;
    let forecast3Article8 = forecast3Article54 + forecast3pss2;
    let forecast3Article14 = forecast3Article54 + forecast3pss2;
    let forecast3Article19 = forecast3Article54 + forecast3pss2;


    //Produkt 3
    let forecast3Product3 = this.forecasts[3].article3;
    let forecast3pss3 = this.forecasts[3].pss3;
    let forecast3Article3 = forecast3Product3 + forecast3pss3;
    //Mehrfachartikel 26
    let forecast3Article26p3 = forecast3Article3 + forecast3pss3;
    let forecast3Article31 = forecast3Article3 + forecast3pss3;
    //Mehrfachartikel 16
    let forecast3Article16p3 = forecast3Article31 + forecast3pss3;
    //Mehrfachartikel 17
    let forecast3Article17p3 = forecast3Article31 + forecast3pss3;
    let forecast3Article30 = forecast3Article56 + forecast3pss3;
    let forecast3Article6 = forecast3Article30 + forecast3pss3;
    let forecast3Article12 = forecast3Article30 + forecast3pss3;
    let forecast3Article29 = forecast3Article30 + forecast3pss3;
    let forecast3Article9 = forecast3Article29 + forecast3pss3;
    let forecast3Article15 = forecast3Article29 + forecast3pss3;
    let forecast3Article20 = forecast3Article29 + forecast3pss3;

    //Kaufteile

    //21
    this.dataSource[0].forecastn3 = forecast3Article1;
    //22
    this.dataSource[1].forecastn3 = forecast3Article2;
    //23
    this.dataSource[2].forecastn3 = forecast3Article3;
    //24
    let f3p1k24 = 2 * forecast3Article49 + 1 * forecast3Article16p1 + 2 * forecast3Article50 + 1 * forecast3Article51 + 1 * forecast3Article1;
    let f3p2k24 = 2 * forecast3Article54 + 1 * forecast3Article16p2 + 2 * forecast3Article55 + 1 * forecast3Article56 + 1 * forecast3Article2;
    let f3p3k24 = 2 * forecast3Article29 + 1 * forecast3Article16p3 + 2 * forecast3Article30 + 1 * forecast3Article31 + 1 * forecast3Article3;
    this.dataSource[3].forecastn3 = f3p1k24 + f3p2k24 + f3p3k24;
    //25
    let f3p1k25 = 2 * forecast3Article49 + 2 * forecast3Article50 ;
    let f3p2k25 = 2 * forecast3Article54 + 2 * forecast3Article55 ;
    let f3p3k25 = 2 * forecast3Article29 + 2 * forecast3Article30 ;
    this.dataSource[4].forecastn3 = f3p1k25 + f3p2k25 + f3p3k25;
    //27
    let f3p1k27 = forecast3Article51 + forecast3Article1 ;
    let f3p2k27 = forecast3Article56 + forecast3Article2 ;
    let f3p3k27 = forecast3Article31 + forecast3Article3 ;
    this.dataSource[5].forecastn3 = f3p1k27 + f3p2k27 + f3p3k27;
    //28
    let f3p1k28 = 3 * forecast3Article18 + forecast3Article16p1 ;
    let f3p2k28 = 4 * forecast3Article19 + forecast3Article16p2 ;
    let f3p3k28 = 5 * forecast3Article20 + forecast3Article16p3 ;
    this.dataSource[6].forecastn3 = f3p1k28 + f3p2k28 + f3p3k28;
    //32
    let f3p1k32 = forecast3Article13 + forecast3Article18 + forecast3Article10 ;
    let f3p2k32 = forecast3Article14 + forecast3Article19 + forecast3Article11 ;
    let f3p3k32 = forecast3Article15 + forecast3Article20 + forecast3Article12 ;
    this.dataSource[7].forecastn3 = f3p1k32 + f3p2k32 + f3p3k32;
    //33
    this.dataSource[8].forecastn3 = forecast3Article9 + forecast3Article6;
    //34
    this.dataSource[9].forecastn3 = 36 * forecast3Article9 + 36 * forecast3Article6;
    //35
    let f3p1k35 = 2 * forecast3Article7 + 2 * forecast3Article4 ;
    let f3p2k35 = 2 * forecast3Article8 + 2 * forecast3Article5 ;
    let f3p3k35 = 2 * forecast3Article9 + 2 * forecast3Article6 ;
    this.dataSource[10].forecastn3 = f3p1k35 + f3p2k35 + f3p3k35;
    //36
    this.dataSource[11].forecastn3 = forecast3Article4 + forecast3Article5 + forecast3Article6;
    //37
    this.dataSource[12].forecastn3 = forecast3Article7 + forecast3Article8 + forecast3Article9;
    //38
    this.dataSource[13].forecastn3 = forecast3Article7 + forecast3Article8 + forecast3Article9;
    //39
    let f3p1k39 = forecast3Article13 + forecast3Article10;
    let f3p2k39 = forecast3Article14 + forecast3Article11;
    let f3p3k39 = forecast3Article15 + forecast3Article12;
    this.dataSource[14].forecastn3 = f3p1k39 + f3p2k39 + f3p3k39;
    //40
    this.dataSource[15].forecastn3 = forecast3Article16p1 + forecast3Article16p2 + forecast3Article16p3;
    //41
    this.dataSource[16].forecastn3 = forecast3Article16p1 + forecast3Article16p2 + forecast3Article16p3;
    //42
    this.dataSource[17].forecastn3 = 2 * forecast3Article16p1 + 2 * forecast3Article16p2 + 2 * forecast3Article16p3;
    //43
    this.dataSource[18].forecastn3 = forecast3Article17p1 + forecast3Article17p2 + forecast3Article17p3;
    //44
    let f3p1k44 = forecast3Article17p1 + forecast3Article1;
    let f3p2k44 = forecast3Article17p2 + forecast3Article2;
    let f3p3k44 = forecast3Article17p3 + forecast3Article3;
    this.dataSource[19].forecastn3 = f3p1k44 + f3p2k44 + f3p3k44;
    //45
    this.dataSource[20].forecastn3 = forecast3Article17p1 + forecast3Article17p2 + forecast3Article17p3;
    //46
    this.dataSource[21].forecastn3 = forecast3Article17p1 + forecast3Article17p2 + forecast3Article17p3;
    //47
    this.dataSource[22].forecastn3 = forecast3Article26p1 + forecast3Article26p2 + forecast3Article26p3;
    //48
    this.dataSource[23].forecastn3 = 2 * forecast3Article26p1 + 2 * forecast3Article26p2 + 2 * forecast3Article26p3;
    //52
    this.dataSource[24].forecastn3 = forecast3Article4 + forecast3Article7;
    //53
    this.dataSource[25].forecastn3 = 36 * forecast3Article4 + 36 * forecast3Article7;
    //57
    this.dataSource[26].forecastn3 = forecast3Article5 + forecast3Article8;
    //58
    this.dataSource[27].forecastn3 = 36 * forecast3Article5 + 36 * forecast3Article8;
    //59
    this.dataSource[28].forecastn3 = 2 * forecast3Article18 + 2 * forecast3Article19 + 2 * forecast3Article20;

    //#endregion

    //#region Variablendeklaration
    let amountArticle1 = 0;
    let stockvalueArticle1 = 0;
    let amountArticle2 = 0;
    let stockvalueArticle2 = 0;
    let amountArticle3 = 0;
    let stockvalueArticle3 = 0;
    let amountArticle4 = 0;
    let stockvalueArticle4 = 0;
    let amountArticle5 = 0;
    let stockvalueArticle5 = 0;
    let amountArticle6 = 0;
    let stockvalueArticle6 = 0;
    let amountArticle7 = 0;
    let stockvalueArticle7 = 0;
    let amountArticle8 = 0;
    let stockvalueArticle8 = 0;
    let amountArticle9 = 0;
    let stockvalueArticle9 = 0;
    let amountArticle10 = 0;
    let stockvalueArticle10 = 0;

    let amountArticle11 = 0;
    let stockvalueArticle11 = 0;
    let amountArticle12 = 0;
    let stockvalueArticle12 = 0;
    let amountArticle13 = 0;
    let stockvalueArticle13 = 0;
    let amountArticle14 = 0;
    let stockvalueArticle14 = 0;
    let amountArticle15 = 0;
    let stockvalueArticle15 = 0;
    let amountArticle16 = 0;
    let stockvalueArticle16 = 0;
    let amountArticle17 = 0;
    let stockvalueArticle17 = 0;
    let amountArticle18 = 0;
    let stockvalueArticle18 = 0;
    let amountArticle19 = 0;
    let stockvalueArticle19 = 0;

    let amountArticle20 = 0;
    let stockvalueArticle20 = 0;
    let amountArticle21 = 0;
    let stockvalueArticle21 = 0;
    let amountArticle22 = 0;
    let stockvalueArticle22 = 0;
    let amountArticle23 = 0;
    let stockvalueArticle23 = 0;
    let amountArticle24 = 0;
    let stockvalueArticle24 = 0;
    let amountArticle25 = 0;
    let stockvalueArticle25 = 0;
    let amountArticle26 = 0;
    let stockvalueArticle26 = 0;
    let amountArticle27 = 0;
    let stockvalueArticle27 = 0;
    let amountArticle28 = 0;
    let stockvalueArticle28 = 0;
    let amountArticle29 = 0;
    let stockvalueArticle29 = 0;

    let amountArticle30 = 0;
    let stockvalueArticle30 = 0;
    let amountArticle31 = 0;
    let stockvalueArticle31 = 0;
    let amountArticle32 = 0;
    let stockvalueArticle32 = 0;
    let amountArticle33 = 0;
    let stockvalueArticle33 = 0;
    let amountArticle34 = 0;
    let stockvalueArticle34 = 0;
    let amountArticle35 = 0;
    let stockvalueArticle35 = 0;
    let amountArticle36 = 0;
    let stockvalueArticle36 = 0;
    let amountArticle37 = 0;
    let stockvalueArticle37 = 0;
    let amountArticle38 = 0;
    let stockvalueArticle38 = 0;
    let amountArticle39 = 0;
    let stockvalueArticle39 = 0;

    let amountArticle40 = 0;
    let stockvalueArticle40 = 0;
    let amountArticle41 = 0;
    let stockvalueArticle41 = 0;
    let amountArticle42 = 0;
    let stockvalueArticle42 = 0;
    let amountArticle43 = 0;
    let stockvalueArticle43 = 0;
    let amountArticle44 = 0;
    let stockvalueArticle44 = 0;
    let amountArticle45 = 0;
    let stockvalueArticle45 = 0;
    let amountArticle46 = 0;
    let stockvalueArticle46 = 0;
    let amountArticle47 = 0;
    let stockvalueArticle47 = 0;
    let amountArticle48 = 0;
    let stockvalueArticle48 = 0;
    let amountArticle49 = 0;
    let stockvalueArticle49 = 0;

    // Artikel ab 50

    let amountArticle50 = 0;
    let stockvalueArticle50 = 0;
    let amountArticle51 = 0;
    let stockvalueArticle51 = 0;
    let amountArticle52 = 0;
    let stockvalueArticle52 = 0;
    let amountArticle53 = 0;
    let stockvalueArticle53 = 0;
    let amountArticle54 = 0;
    let stockvalueArticle54 = 0;
    let amountArticle55 = 0;
    let stockvalueArticle55 = 0;
    let amountArticle56 = 0;
    let stockvalueArticle56 = 0;
    let amountArticle57 = 0;
    let stockvalueArticle57 = 0;
    let amountArticle58 = 0;
    let stockvalueArticle58 = 0;
    let amountArticle59 = 0;
    let stockvalueArticle59 = 0;

    //#endregion

    //Produktionsmenge
    for (let i = 0; i < this.orders.length; i++) {
      let articleId = this.orders[i].article;
      switch (articleId) {
        case 1:
          amountArticle1 += this.orders[i].amount;
          stockvalueArticle1 = this.orders[i].stockvalue;
        case 2:
          amountArticle2 += this.orders[i].amount;
          stockvalueArticle2 = this.orders[i].stockvalue;
        case 3:
          amountArticle3 += this.orders[i].amount;
          stockvalueArticle3 = this.orders[i].stockvalue;
        case 4:
          amountArticle4 += this.orders[i].amount;
          stockvalueArticle4 = this.orders[i].stockvalue;
        case 5:
          amountArticle5 += this.orders[i].amount;
          stockvalueArticle5 = this.orders[i].stockvalue;
        case 6:
          amountArticle6 += this.orders[i].amount;
          stockvalueArticle6 = this.orders[i].stockvalue;
        case 7:
          amountArticle7 += this.orders[i].amount;
          stockvalueArticle7 = this.orders[i].stockvalue;
        case 8:
          amountArticle8 += this.orders[i].amount;
          stockvalueArticle8 = this.orders[i].stockvalue;
        case 9:
          amountArticle9 += this.orders[i].amount;
          stockvalueArticle9 = this.orders[i].stockvalue;
        case 10:
          amountArticle10 += this.orders[i].amount;
          stockvalueArticle10 = this.orders[i].stockvalue;

        case 11:
          amountArticle11 += this.orders[i].amount;
          stockvalueArticle11 = this.orders[i].stockvalue;

        case 12:
          amountArticle12 += this.orders[i].amount;
          stockvalueArticle12 = this.orders[i].stockvalue;

        case 13:
          amountArticle13 += this.orders[i].amount;
          stockvalueArticle13 = this.orders[i].stockvalue;

        case 14:
          amountArticle14 += this.orders[i].amount;
          stockvalueArticle14 = this.orders[i].stockvalue;

        case 15:
          amountArticle15 += this.orders[i].amount;
          stockvalueArticle15 = this.orders[i].stockvalue;

        case 16:
          amountArticle16 += this.orders[i].amount;
          stockvalueArticle16 = this.orders[i].stockvalue;

        case 17:
          amountArticle17 += this.orders[i].amount;
          stockvalueArticle17 = this.orders[i].stockvalue;

        case 18:
          amountArticle18 += this.orders[i].amount;
          stockvalueArticle18 = this.orders[i].stockvalue;
        case 19:
          amountArticle19 += this.orders[i].amount;
          stockvalueArticle19 = this.orders[i].stockvalue;

        case 20:
          amountArticle20 += this.orders[i].amount;
          stockvalueArticle20 = this.orders[i].stockvalue;
        case 21:
          amountArticle21 += this.orders[i].amount;
          stockvalueArticle21 = this.orders[i].stockvalue;
        case 22:
          amountArticle22 += this.orders[i].amount;
          stockvalueArticle22 = this.orders[i].stockvalue;
        case 23:
          amountArticle23 += this.orders[i].amount;
          stockvalueArticle23 = this.orders[i].stockvalue;
        case 24:
          amountArticle24 += this.orders[i].amount;
          stockvalueArticle24 = this.orders[i].stockvalue;
        case 25:
          amountArticle25 += this.orders[i].amount;
          stockvalueArticle25 = this.orders[i].stockvalue;
        case 26:
          amountArticle26 += this.orders[i].amount;
          stockvalueArticle26 = this.orders[i].stockvalue;
        case 27:
          amountArticle27 += this.orders[i].amount;
          stockvalueArticle27 = this.orders[i].stockvalue;
        case 28:
          amountArticle28 += this.orders[i].amount;
          stockvalueArticle28 = this.orders[i].stockvalue;
        case 29:
          amountArticle29 += this.orders[i].amount;
          stockvalueArticle29 = this.orders[i].stockvalue;

        case 30:
          amountArticle30 += this.orders[i].amount;
          stockvalueArticle30 = this.orders[i].stockvalue;
        case 31:
          amountArticle31 += this.orders[i].amount;
          stockvalueArticle31 = this.orders[i].stockvalue;
        case 32:
          amountArticle32 += this.orders[i].amount;
          stockvalueArticle32 = this.orders[i].stockvalue;
        case 33:
          amountArticle33 += this.orders[i].amount;
          stockvalueArticle33 = this.orders[i].stockvalue;
        case 34:
          amountArticle34 += this.orders[i].amount;
          stockvalueArticle34 = this.orders[i].stockvalue;
        case 35:
          amountArticle35 += this.orders[i].amount;
          stockvalueArticle35 = this.orders[i].stockvalue;
        case 36:
          amountArticle36 += this.orders[i].amount;
          stockvalueArticle36 = this.orders[i].stockvalue;
        case 37:
          amountArticle37 += this.orders[i].amount;
          stockvalueArticle37 = this.orders[i].stockvalue;
        case 38:
          amountArticle38 += this.orders[i].amount;
          stockvalueArticle38 = this.orders[i].stockvalue;
        case 39:
          amountArticle39 += this.orders[i].amount;
          stockvalueArticle39 = this.orders[i].stockvalue;

        case 40:
          amountArticle40 += this.orders[i].amount;
          stockvalueArticle40 = this.orders[i].stockvalue;
        case 41:
          amountArticle41 += this.orders[i].amount;
          stockvalueArticle41 = this.orders[i].stockvalue;
        case 42:
          amountArticle42 += this.orders[i].amount;
          stockvalueArticle42 = this.orders[i].stockvalue;
        case 43:
          amountArticle43 += this.orders[i].amount;
          stockvalueArticle43 = this.orders[i].stockvalue;
        case 44:
          amountArticle44 += this.orders[i].amount;
          stockvalueArticle44 = this.orders[i].stockvalue;
        case 45:
          amountArticle45 += this.orders[i].amount;
          stockvalueArticle45 = this.orders[i].stockvalue;
        case 46:
          amountArticle46 += this.orders[i].amount;
          stockvalueArticle46 = this.orders[i].stockvalue;
        case 47:
          amountArticle47 += this.orders[i].amount;
          stockvalueArticle47 = this.orders[i].stockvalue;
        case 48:
          amountArticle48 += this.orders[i].amount;
          stockvalueArticle48 = this.orders[i].stockvalue;
        case 49:
          amountArticle4 += this.orders[i].amount;
          stockvalueArticle49 = this.orders[i].stockvalue;
        case 50:
          amountArticle50 += this.orders[i].amount;
          stockvalueArticle50 = this.orders[i].stockvalue;
        case 51:
          amountArticle51 += this.orders[i].amount;
          stockvalueArticle51 = this.orders[i].stockvalue;
        case 52:
          amountArticle52 += this.orders[i].amount;
          stockvalueArticle52 = this.orders[i].stockvalue;
        case 53:
          amountArticle53 += this.orders[i].amount;
          stockvalueArticle53 = this.orders[i].stockvalue;
        case 54:
          amountArticle54 += this.orders[i].amount;
          stockvalueArticle54 = this.orders[i].stockvalue;
        case 55:
          amountArticle55 += this.orders[i].amount;
          stockvalueArticle55 = this.orders[i].stockvalue;
        case 56:
          amountArticle56 += this.orders[i].amount;
          stockvalueArticle56 = this.orders[i].stockvalue;
        case 57:
          amountArticle57 += this.orders[i].amount;
          stockvalueArticle57 = this.orders[i].stockvalue;
        case 58:
          amountArticle58 += this.orders[i].amount;
          stockvalueArticle58 = this.orders[i].stockvalue;
        case 59:
          amountArticle59 += this.orders[i].amount;
          stockvalueArticle59 = this.orders[i].stockvalue;
      }
    }

    // Aktueller Lagerbestand (StockValue)
    for (let i = 0; i < this.articles.length; i++) {
      let articleId = this.articles[i].id;
      switch (articleId) {
        case 1:
          stockvalueArticle1 = this.articles[i].amount;
        case 2:
          stockvalueArticle2 = this.articles[i].amount;
        case 3:
          stockvalueArticle3 = this.articles[i].amount;
        case 4:
          stockvalueArticle4 = this.articles[i].amount;
        case 5:
          stockvalueArticle5 = this.articles[i].amount;
        case 6:
          stockvalueArticle6 = this.articles[i].amount;
        case 7:
          stockvalueArticle7 = this.articles[i].amount;
        case 8:
          stockvalueArticle8 = this.articles[i].amount;
        case 9:
          stockvalueArticle9 = this.articles[i].amount;
        case 10:
          stockvalueArticle10 = this.articles[i].amount;

        case 11:
          stockvalueArticle11 = this.articles[i].amount;

        case 12:
          stockvalueArticle12 = this.articles[i].amount;

        case 13:
          stockvalueArticle13 = this.articles[i].amount;

        case 14:
          stockvalueArticle14 = this.articles[i].amount;

        case 15:
          stockvalueArticle15 = this.articles[i].amount;

        case 16:
          stockvalueArticle16 = this.articles[i].amount;

        case 17:
          stockvalueArticle17 = this.articles[i].amount;

        case 18:
          stockvalueArticle18 = this.articles[i].amount;
        case 19:
          stockvalueArticle19 = this.articles[i].amount;

        case 20:
          stockvalueArticle20 = this.articles[i].amount;
        case 21:
          stockvalueArticle21 = this.articles[i].amount;
        case 22:
          stockvalueArticle22 = this.articles[i].amount;
        case 23:
          stockvalueArticle23 = this.articles[i].amount;
        case 24:
          stockvalueArticle24 = this.articles[i].amount;
        case 25:
          stockvalueArticle25 = this.articles[i].amount;
        case 26:
          stockvalueArticle26 = this.articles[i].amount;
        case 27:
          amountArticle27 += 0;
          stockvalueArticle27 = this.articles[i].amount;
        case 28:
          amountArticle28 += 0;
          stockvalueArticle28 = this.articles[i].amount;
        case 29:
          amountArticle29 += 0;
          stockvalueArticle29 = this.articles[i].amount;

        case 30:
          amountArticle30 += 0;
          stockvalueArticle30 = this.articles[i].amount;
        case 31:
          amountArticle31 += 0;
          stockvalueArticle31 = this.articles[i].amount;
        case 32:
          stockvalueArticle32 = this.articles[i].amount;
        case 33:
          amountArticle33 += 0;
          stockvalueArticle33 = this.articles[i].amount;
        case 34:
          amountArticle34 += 0;
          stockvalueArticle34 = this.articles[i].amount;
        case 35:
          amountArticle35 += 0;
          stockvalueArticle35 = this.articles[i].amount;
        case 36:
          amountArticle36 += 0;
          stockvalueArticle36 = this.articles[i].amount;
        case 37:
          stockvalueArticle37 = this.articles[i].amount;
        case 38:
          stockvalueArticle38 = this.articles[i].amount;
        case 39:
          stockvalueArticle39 = this.articles[i].amount;
        case 40:
          stockvalueArticle40 = this.articles[i].amount;
        case 41:
          stockvalueArticle41 = this.articles[i].amount;
        case 42:
          stockvalueArticle42 = this.articles[i].amount;
        case 43:
          stockvalueArticle43 = this.articles[i].amount;
        case 44:
          stockvalueArticle44 = this.articles[i].amount;
        case 45:
          amountArticle45 += 0;
          stockvalueArticle45 = this.articles[i].amount;
        case 46:
          amountArticle46 += 0;
          stockvalueArticle46 = this.articles[i].amount;
        case 47:
          amountArticle47 += 0;
          stockvalueArticle47 = this.articles[i].amount;
        case 48:
          amountArticle48 += 0;
          stockvalueArticle48 = this.articles[i].amount;
        case 49:
          amountArticle4 += 0;
          stockvalueArticle49 = this.articles[i].amount;
        case 50:
          amountArticle50 += 0;
          stockvalueArticle50 = this.articles[i].amount;
        case 51:
          amountArticle51 += 0;
          stockvalueArticle51 = this.articles[i].amount;
        case 52:
          amountArticle52 += 0;
          stockvalueArticle52 = this.articles[i].amount;
        case 53:
          amountArticle53 += 0;
          stockvalueArticle53 = this.articles[i].amount;
        case 54:
          amountArticle54 += 0;
          stockvalueArticle54 = this.articles[i].amount;
        case 55:
          amountArticle55 += 0;
          stockvalueArticle55 = this.articles[i].amount;
        case 56:
          amountArticle56 += 0;
          stockvalueArticle56 = this.articles[i].amount;
        case 57:
          amountArticle57 += 0;
          stockvalueArticle57 = this.articles[i].amount;
        case 58:
          amountArticle58 += 0;
          stockvalueArticle58 = this.articles[i].amount;
        case 59:
          amountArticle59 += 0;
          stockvalueArticle59 = this.articles[i].amount;
      }
    }

    //current Stock
    this.dataSource[0].currentStock = stockvalueArticle21;
    this.dataSource[1].currentStock = stockvalueArticle22;
    this.dataSource[2].currentStock = stockvalueArticle23;
    this.dataSource[3].currentStock = stockvalueArticle24;
    this.dataSource[4].currentStock = stockvalueArticle25;
    this.dataSource[5].currentStock = stockvalueArticle27;
    this.dataSource[6].currentStock = stockvalueArticle28;
    this.dataSource[7].currentStock = stockvalueArticle32;
    this.dataSource[8].currentStock = stockvalueArticle33;
    this.dataSource[9].currentStock = stockvalueArticle34;
    this.dataSource[10].currentStock = stockvalueArticle35;
    this.dataSource[11].currentStock = stockvalueArticle36;
    this.dataSource[12].currentStock = stockvalueArticle37;
    this.dataSource[13].currentStock = stockvalueArticle38;
    this.dataSource[14].currentStock = stockvalueArticle39;
    this.dataSource[15].currentStock = stockvalueArticle40;
    this.dataSource[16].currentStock = stockvalueArticle41;
    this.dataSource[17].currentStock = stockvalueArticle42;
    this.dataSource[18].currentStock = stockvalueArticle43;
    this.dataSource[19].currentStock = stockvalueArticle44;
    this.dataSource[20].currentStock = stockvalueArticle45;
    this.dataSource[21].currentStock = stockvalueArticle46;
    this.dataSource[22].currentStock = stockvalueArticle47;
    this.dataSource[23].currentStock = stockvalueArticle48;
    this.dataSource[24].currentStock = stockvalueArticle52;
    this.dataSource[25].currentStock = stockvalueArticle53;
    this.dataSource[26].currentStock = stockvalueArticle57;
    this.dataSource[27].currentStock = stockvalueArticle58;
    this.dataSource[28].currentStock = stockvalueArticle59;

    //Warteschlagen aufaddieren

    let queuesArticle1 = this.checkQueue(this.queues.find(queue => queue.article === 1 && queue.inwork === false))
    let queuesArticle2 = this.checkQueue(this.queues.find(queue => queue.article === 2 && queue.inwork === false))
    let queuesArticle3 = this.checkQueue(this.queues.find(queue => queue.article === 3 && queue.inwork === false))
    let queuesArticle4 = this.checkQueue(this.queues.find(queue => queue.article === 4 && queue.inwork === false))
    let queuesArticle5 = this.checkQueue(this.queues.find(queue => queue.article === 5 && queue.inwork === false))
    let queuesArticle6 = this.checkQueue(this.queues.find(queue => queue.article === 6 && queue.inwork === false))
    let queuesArticle7 = this.checkQueue(this.queues.find(queue => queue.article === 7 && queue.inwork === false))
    let queuesArticle8 = this.checkQueue(this.queues.find(queue => queue.article === 8 && queue.inwork === false))
    let queuesArticle9 = this.checkQueue(this.queues.find(queue => queue.article === 9 && queue.inwork === false))
    let queuesArticle10 = this.checkQueue(this.queues.find(queue => queue.article === 10 && queue.inwork === false))
    let queuesArticle11 = this.checkQueue(this.queues.find(queue => queue.article === 11 && queue.inwork === false))
    let queuesArticle12 = this.checkQueue(this.queues.find(queue => queue.article === 12 && queue.inwork === false))
    let queuesArticle13 = this.checkQueue(this.queues.find(queue => queue.article === 13 && queue.inwork === false))
    let queuesArticle14 = this.checkQueue(this.queues.find(queue => queue.article === 14 && queue.inwork === false))
    let queuesArticle15 = this.checkQueue(this.queues.find(queue => queue.article === 15 && queue.inwork === false))
    let queuesArticle16 = this.checkQueue(this.queues.find(queue => queue.article === 16 && queue.inwork === false))
    let queuesArticle17 = this.checkQueue(this.queues.find(queue => queue.article === 17 && queue.inwork === false))
    let queuesArticle18 = this.checkQueue(this.queues.find(queue => queue.article === 18 && queue.inwork === false))
    let queuesArticle19 = this.checkQueue(this.queues.find(queue => queue.article === 19 && queue.inwork === false))
    let queuesArticle20 = this.checkQueue(this.queues.find(queue => queue.article === 20 && queue.inwork === false))
    let queuesArticle21 = this.checkQueue(this.queues.find(queue => queue.article === 21 && queue.inwork === false))
    let queuesArticle22 = this.checkQueue(this.queues.find(queue => queue.article === 22 && queue.inwork === false))
    let queuesArticle23 = this.checkQueue(this.queues.find(queue => queue.article === 23 && queue.inwork === false))
    let queuesArticle24 = this.checkQueue(this.queues.find(queue => queue.article === 24 && queue.inwork === false))
    let queuesArticle25 = this.checkQueue(this.queues.find(queue => queue.article === 25 && queue.inwork === false))
    let queuesArticle26 = this.checkQueue(this.queues.find(queue => queue.article === 26 && queue.inwork === false))
    let queuesArticle27 = this.checkQueue(this.queues.find(queue => queue.article === 27 && queue.inwork === false))
    let queuesArticle28 = this.checkQueue(this.queues.find(queue => queue.article === 28 && queue.inwork === false))
    let queuesArticle29 = this.checkQueue(this.queues.find(queue => queue.article === 29 && queue.inwork === false))
    let queuesArticle30 = this.checkQueue(this.queues.find(queue => queue.article === 30 && queue.inwork === false))
    let queuesArticle31 = this.checkQueue(this.queues.find(queue => queue.article === 31 && queue.inwork === false))
    let queuesArticle32 = this.checkQueue(this.queues.find(queue => queue.article === 32 && queue.inwork === false))
    let queuesArticle33 = this.checkQueue(this.queues.find(queue => queue.article === 33 && queue.inwork === false))
    let queuesArticle34 = this.checkQueue(this.queues.find(queue => queue.article === 34 && queue.inwork === false))
    let queuesArticle35 = this.checkQueue(this.queues.find(queue => queue.article === 35 && queue.inwork === false))
    let queuesArticle36 = this.checkQueue(this.queues.find(queue => queue.article === 36 && queue.inwork === false))
    let queuesArticle37 = this.checkQueue(this.queues.find(queue => queue.article === 37 && queue.inwork === false))
    let queuesArticle38 = this.checkQueue(this.queues.find(queue => queue.article === 38 && queue.inwork === false))
    let queuesArticle39 = this.checkQueue(this.queues.find(queue => queue.article === 39 && queue.inwork === false))
    let queuesArticle40 = this.checkQueue(this.queues.find(queue => queue.article === 40 && queue.inwork === false))
    let queuesArticle41 = this.checkQueue(this.queues.find(queue => queue.article === 41 && queue.inwork === false))
    let queuesArticle42 = this.checkQueue(this.queues.find(queue => queue.article === 42 && queue.inwork === false))
    let queuesArticle43 = this.checkQueue(this.queues.find(queue => queue.article === 43 && queue.inwork === false))
    let queuesArticle44 = this.checkQueue(this.queues.find(queue => queue.article === 44 && queue.inwork === false))
    let queuesArticle45 = this.checkQueue(this.queues.find(queue => queue.article === 45 && queue.inwork === false))
    let queuesArticle46 = this.checkQueue(this.queues.find(queue => queue.article === 46 && queue.inwork === false))
    let queuesArticle47 = this.checkQueue(this.queues.find(queue => queue.article === 47 && queue.inwork === false))
    let queuesArticle48 = this.checkQueue(this.queues.find(queue => queue.article === 48 && queue.inwork === false))
    let queuesArticle49 = this.checkQueue(this.queues.find(queue => queue.article === 49 && queue.inwork === false))
    let queuesArticle50 = this.checkQueue(this.queues.find(queue => queue.article === 50 && queue.inwork === false))
    let queuesArticle51 = this.checkQueue(this.queues.find(queue => queue.article === 51 && queue.inwork === false))
    let queuesArticle52 = this.checkQueue(this.queues.find(queue => queue.article === 52 && queue.inwork === false))
    let queuesArticle53 = this.checkQueue(this.queues.find(queue => queue.article === 53 && queue.inwork === false))
    let queuesArticle54 = this.checkQueue(this.queues.find(queue => queue.article === 54 && queue.inwork === false))
    let queuesArticle55 = this.checkQueue(this.queues.find(queue => queue.article === 55 && queue.inwork === false))
    let queuesArticle56 = this.checkQueue(this.queues.find(queue => queue.article === 56 && queue.inwork === false))
    let queuesArticle57 = this.checkQueue(this.queues.find(queue => queue.article === 57 && queue.inwork === false))
    let queuesArticle58 = this.checkQueue(this.queues.find(queue => queue.article === 58 && queue.inwork === false))
    let queuesArticle59 = this.checkQueue(this.queues.find(queue => queue.article === 59 && queue.inwork === false))

    //current Consumption - Aktueller Verbrauch
    //#region Aktueller Verbrauch

    //21
    this.dataSource[0].currentConsumption = amountArticle1 + queuesArticle1;
    //22
    this.dataSource[1].currentConsumption = amountArticle2 + queuesArticle2;
    //23
    this.dataSource[2].currentConsumption = amountArticle3 + queuesArticle3;
    //24
    let cp1k24 = 2 * amountArticle49 + 2 * amountArticle50 + 1 * amountArticle51 + 1 * amountArticle1;
    let cp2k24 = 2 * amountArticle54 + 2 * amountArticle55 + 1 * amountArticle56 + 1 * amountArticle2;
    let cp3k24 = 2 * amountArticle29 + 2 * amountArticle30 + 1 * amountArticle31 + 1 * amountArticle3;
    this.dataSource[3].currentConsumption = cp1k24 + cp2k24 + cp3k24 + amountArticle16 + queuesArticle49 +  queuesArticle50 +  queuesArticle51 +  queuesArticle1 + queuesArticle54 +  queuesArticle55 +  queuesArticle56 +  queuesArticle2 +  queuesArticle29 +  queuesArticle30 +  queuesArticle31 +  queuesArticle3;
    //25
    let cp1k25 = 2 * amountArticle49 + 2 * amountArticle50 ;
    let cp2k25 = 2 * amountArticle54 + 2 * amountArticle55 ;
    let cp3k25 = 2 * amountArticle29 + 2 * amountArticle30 ;
    this.dataSource[4].currentConsumption = cp1k25 + cp2k25 + cp3k25 + queuesArticle49 +  queuesArticle50 +  queuesArticle54 +  queuesArticle55 +  queuesArticle29 +  queuesArticle30 ;
    //27
    let cp1k27 = amountArticle51 + amountArticle1 ;
    let cp2k27 = amountArticle56 + amountArticle2 ;
    let cp3k27 = amountArticle31 + amountArticle3 ;
    this.dataSource[5].currentConsumption = cp1k27 + cp2k27 + cp3k27 + queuesArticle51 + queuesArticle1 + queuesArticle56 + queuesArticle2 + queuesArticle31 + queuesArticle3;
    //28
    let cp1k28 = 3 * amountArticle18;
    let cp2k28 = 4 * amountArticle19;
    let cp3k28 = 5 * amountArticle20;
    this.dataSource[6].currentConsumption = cp1k28 + cp2k28 + cp3k28 + amountArticle16 + queuesArticle18+  queuesArticle19 + queuesArticle20;
    //32
    let cp1k32 = amountArticle13 + amountArticle18 + amountArticle10 ;
    let cp2k32 = amountArticle14 + amountArticle19 + amountArticle11 ;
    let cp3k32 = amountArticle15 + amountArticle20 + amountArticle12 ;
    this.dataSource[7].currentConsumption = cp1k32 + cp2k32 + cp3k32 + queuesArticle13 + queuesArticle18 + queuesArticle10 + queuesArticle14 + queuesArticle19 + queuesArticle11 + queuesArticle15 + queuesArticle20 + queuesArticle12;
    //33
    this.dataSource[8].currentConsumption = amountArticle9 + amountArticle6 + queuesArticle9 + queuesArticle6;
    //34
    this.dataSource[9].currentConsumption = 36 * amountArticle9 + 36 * amountArticle6 + queuesArticle9 +  queuesArticle6;
    //35
    let cp1k35 = 2 * amountArticle7 + 2 * amountArticle4 ;
    let cp2k35 = 2 * amountArticle8 + 2 * amountArticle5 ;
    let cp3k35 = 2 * amountArticle9 + 2 * amountArticle6 ;
    this.dataSource[10].currentConsumption = cp1k35 + cp2k35 + cp3k35 + queuesArticle7 +  queuesArticle4 + queuesArticle8 +  queuesArticle5 + queuesArticle9 +  queuesArticle6 ;
    //36
    this.dataSource[11].currentConsumption = amountArticle4 + amountArticle5 + amountArticle6 + queuesArticle4 + queuesArticle5 + queuesArticle6;
    //37
    this.dataSource[12].currentConsumption = amountArticle7 + amountArticle8 + amountArticle9 + queuesArticle7 + queuesArticle8 + queuesArticle9;
    //38
    this.dataSource[13].currentConsumption = amountArticle7 + amountArticle8 + amountArticle9 + queuesArticle7 + queuesArticle8 + queuesArticle9;
    //39
    let cp1k39 = amountArticle13 + amountArticle10;
    let cp2k39 = amountArticle14 + amountArticle11;
    let cp3k39 = amountArticle15 + amountArticle12;
    this.dataSource[14].currentConsumption = cp1k39 + cp2k39 + cp3k39 + queuesArticle13 + queuesArticle10 + queuesArticle14 + queuesArticle11 + queuesArticle15 + queuesArticle12;
    //40
    this.dataSource[15].currentConsumption = amountArticle16 + queuesArticle16;
    //41
    this.dataSource[16].currentConsumption = amountArticle16 + queuesArticle16;
    //42
    this.dataSource[17].currentConsumption = 2 * amountArticle16 + queuesArticle16;
    //43
    this.dataSource[18].currentConsumption = amountArticle17 + queuesArticle17;
    //44
    this.dataSource[19].currentConsumption = amountArticle17 + amountArticle1 + amountArticle2 + amountArticle3 + queuesArticle17 + queuesArticle1 + queuesArticle2 + queuesArticle3;
    //45
    this.dataSource[20].currentConsumption = amountArticle17 + queuesArticle17;
    //46
    this.dataSource[21].currentConsumption = amountArticle17 + queuesArticle17 ;
    //47
    this.dataSource[22].currentConsumption = amountArticle26 + queuesArticle26;
    //48
    this.dataSource[23].currentConsumption = 2 * amountArticle26 + queuesArticle26;
    //52
    this.dataSource[24].currentConsumption = amountArticle4 + amountArticle7 + queuesArticle4 + queuesArticle7;
    //53
    this.dataSource[25].currentConsumption = 36 * amountArticle4 + 36 * amountArticle7 + queuesArticle4 +  queuesArticle7;
    //57
    this.dataSource[26].currentConsumption = amountArticle5 + amountArticle8 + queuesArticle5 + queuesArticle8;
    //58
    this.dataSource[27].currentConsumption = 36 * amountArticle5 + 36 * amountArticle8 + queuesArticle5 +  queuesArticle8;
    //59
    this.dataSource[27].currentConsumption = 2 * amountArticle18 + 2 * amountArticle19 + 2 * amountArticle20 + queuesArticle18 +  queuesArticle19 +  queuesArticle20;;

    //#endregion

    //Aktuelle Periode bestimmen
    
    let nPeriod = this.forecasts[0].period + 1;
    console.log(nPeriod);
    this.period = nPeriod;
    let futureStock = this.futureInwardStockMovements.filter(
      (futureInwardStockMovements) => futureInwardStockMovements.arrivingPeriod === nPeriod
    );
    console.log(futureStock);



    for (let i = 0; i < futureStock.length; i++) {

        if (futureStock[i].article == 21) this.dataSource[0].arrivingOrders += futureStock[i].amount; console.log(this.dataSource[0]);
        if (futureStock[i].article == 22) this.dataSource[1].arrivingOrders += futureStock[i].amount; console.log(this.dataSource[1]);
        if (futureStock[i].article == 23) this.dataSource[2].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 24) this.dataSource[3].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 25) this.dataSource[4].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 27) this.dataSource[5].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 28) this.dataSource[6].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 32) this.dataSource[7].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 33) this.dataSource[8].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 34) this.dataSource[9].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 35) this.dataSource[10].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 36) this.dataSource[11].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 37) this.dataSource[12].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 38) this.dataSource[13].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 39) this.dataSource[14].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 40) this.dataSource[15].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 41) this.dataSource[16].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 42) this.dataSource[17].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 43) this.dataSource[18].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 44) this.dataSource[19].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 45) this.dataSource[20].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 46) this.dataSource[21].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 47) this.dataSource[22].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 48) this.dataSource[23].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 52) this.dataSource[24].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 53) this.dataSource[25].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 57) this.dataSource[26].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 58) this.dataSource[27].arrivingOrders += futureStock[i].amount;
        if (futureStock[i].article == 59) this.dataSource[28].arrivingOrders += futureStock[i].amount;
      
      
    }
    let n1Period = nPeriod + 1; console.log(n1Period)
    let n2Period = nPeriod + 2;
    let n3Period = nPeriod + 3;
    let futureStockN1 = this.futureInwardStockMovements.filter(
      (futureInwardStockMovements) => futureInwardStockMovements.arrivingPeriod === n1Period
    );
    console.log(futureStockN1);
      
    for (let i = 0; i < futureStockN1.length; i++) {
        if (futureStockN1[i].article == 21) this.dataSource[0].ordersPeriodN1= futureStockN1[i].amount; console.log(this.dataSource[0]);
        if (futureStockN1[i].article == 22) this.dataSource[1].ordersPeriodN1= futureStockN1[i].amount; console.log(this.dataSource[1]);  
        if (futureStockN1[i].article == 23) this.dataSource[2].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 24) this.dataSource[3].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 25) this.dataSource[4].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 27) this.dataSource[5].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 28) this.dataSource[6].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 32) this.dataSource[7].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 33) this.dataSource[8].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 34) this.dataSource[9].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 35) this.dataSource[10].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 36) this.dataSource[11].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 37) this.dataSource[12].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 38) this.dataSource[13].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 39) this.dataSource[14].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 40) this.dataSource[15].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 41) this.dataSource[16].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 42) this.dataSource[17].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 43) this.dataSource[18].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 44) this.dataSource[19].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 45) this.dataSource[20].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 46) this.dataSource[21].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 47) this.dataSource[22].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 48) this.dataSource[23].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 52) this.dataSource[24].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 53) this.dataSource[25].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 57) this.dataSource[26].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 58) this.dataSource[27].ordersPeriodN1= futureStockN1[i].amount;
        if (futureStockN1[i].article == 59) this.dataSource[28].ordersPeriodN1= futureStockN1[i].amount;
      
    }

    let futureStockN2 = this.futureInwardStockMovements.filter(
      (futureInwardStockMovements) => futureInwardStockMovements.arrivingPeriod === n2Period
    );
    console.log(futureStockN2);
      
    for (let i = 0; i < futureStockN2.length; i++) {
        if (futureStockN2[i].article == 21) this.dataSource[0].ordersPeriodN2 = futureStockN2[i].amount; console.log(this.dataSource[0]);
        if (futureStockN2[i].article == 22) this.dataSource[1].ordersPeriodN2 = futureStockN2[i].amount; console.log(this.dataSource[1]);  
        if (futureStockN2[i].article == 23) this.dataSource[2].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 24) this.dataSource[3].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 25) this.dataSource[4].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 27) this.dataSource[5].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 28) this.dataSource[6].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 32) this.dataSource[7].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 33) this.dataSource[8].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 34) this.dataSource[9].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 35) this.dataSource[10].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 36) this.dataSource[11].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 37) this.dataSource[12].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 38) this.dataSource[13].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 39) this.dataSource[14].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 40) this.dataSource[15].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 41) this.dataSource[16].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 42) this.dataSource[17].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 43) this.dataSource[18].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 44) this.dataSource[19].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 45) this.dataSource[20].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 46) this.dataSource[21].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 47) this.dataSource[22].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 48) this.dataSource[23].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 52) this.dataSource[24].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 53) this.dataSource[25].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 57) this.dataSource[26].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 58) this.dataSource[27].ordersPeriodN2 = futureStockN2[i].amount;
        if (futureStockN2[i].article == 59) this.dataSource[28].ordersPeriodN2 = futureStockN2[i].amount;
      
    }

    let futureStockN3 = this.futureInwardStockMovements.filter(
      (futureInwardStockMovements) => futureInwardStockMovements.arrivingPeriod === n3Period
    );
      
    for (let i = 0; i < futureStockN2.length; i++) {
        if (futureStockN3[i].article == 21) this.dataSource[0].ordersPeriodN3 = futureStockN3[i].amount; console.log(this.dataSource[0]);
        if (futureStockN3[i].article == 22) this.dataSource[1].ordersPeriodN3 = futureStockN3[i].amount; console.log(this.dataSource[1]);  
        if (futureStockN3[i].article == 23) this.dataSource[2].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 24) this.dataSource[3].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 25) this.dataSource[4].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 27) this.dataSource[5].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 28) this.dataSource[6].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 32) this.dataSource[7].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 33) this.dataSource[8].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 34) this.dataSource[9].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 35) this.dataSource[10].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 36) this.dataSource[11].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 37) this.dataSource[12].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 38) this.dataSource[13].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 39) this.dataSource[14].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 40) this.dataSource[15].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 41) this.dataSource[16].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 42) this.dataSource[17].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 43) this.dataSource[18].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 44) this.dataSource[19].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 45) this.dataSource[20].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 46) this.dataSource[21].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 47) this.dataSource[22].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 48) this.dataSource[23].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 52) this.dataSource[24].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 53) this.dataSource[25].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 57) this.dataSource[26].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 58) this.dataSource[27].ordersPeriodN3 = futureStockN3[i].amount;
        if (futureStockN3[i].article == 59) this.dataSource[28].ordersPeriodN3 = futureStockN3[i].amount;
      
    }



  }
}

export interface MaterialPlanningTableElement {
  article: number;
  deliveryTimeN: number;
  deliveryTimeE: number;
  variance: number;
  discount: number;
  price: number;
  currentStock: number;
  currentConsumption: number;
  forecastn1: number;
  forecastn2: number;
  forecastn3: number;
  orderCosts: number;
  orderQuantity: number;
  orderQuantityE: number;
  gesamtkosten: number;
  gesamtkostenE: number;
  arrivingOrders: number;
  ordersPeriodN: number;
  ordersPeriodN1: number;
  ordersPeriodN2: number;
  ordersPeriodN3: number;
  ordersPeriodNE: number;
  ordersPeriodN1E: number;
  ordersPeriodN2E: number;
  ordersPeriodN3E: number;
}

const ELEMENT_DATA: MaterialPlanningTableElement[] = [
  {
    article: 21,
    deliveryTimeN: 1.8,
    deliveryTimeE: 0.9,
    variance: 0.4,
    discount: 300,
    price: 5,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 22,
    deliveryTimeN: 1.7,
    deliveryTimeE: 0.9,
    variance: 0.4,
    discount: 300,
    price: 6.5,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 23,
    deliveryTimeN: 1.2,
    deliveryTimeE: 0.6,
    variance: 0.2,
    discount: 300,
    price: 6.5,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 24,
    deliveryTimeN: 3.2,
    deliveryTimeE: 1.6,
    variance: 0.3,
    discount: 6100,
    price: 0.06,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 100,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 25,
    deliveryTimeN: 0.9,
    deliveryTimeE: 0.5, 
    variance: 0.2,
    discount: 3600,
    price: 0.06,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 27,
    deliveryTimeN: 0.9,
    deliveryTimeE: 0.5, 
    variance: 0.2,
    discount: 1800,
    price: 0.1,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 75,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 28,
    deliveryTimeN: 1.7,
    deliveryTimeE: 0.9,
    variance: 0.4,
    discount: 4500,
    price: 1.2,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 32,
    deliveryTimeN: 2.1,
    deliveryTimeE: 1.1, 
    variance: 0.5,
    discount: 2700,
    price: 0.75,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 33,
    deliveryTimeN: 1.9,
    deliveryTimeE: 0.9, 
    variance: 0.5,
    discount: 900,
    price: 22,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 75,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },

  {
    article: 34,
    deliveryTimeN: 1.6,
    deliveryTimeE: 0.8,
    variance: 0.3,
    discount: 22000,
    price: 0.1,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 35,
    deliveryTimeN: 2.2,
    deliveryTimeE: 1.1,
    variance: 0.4,
    discount: 3600,
    price: 1,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 75,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 36,
    deliveryTimeN: 1.2,
    deliveryTimeE: 0.6,
    variance: 0.1,
    discount: 900,
    price: 8,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 100,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 37,
    deliveryTimeN: 1.5,
    deliveryTimeE: 0.8, 
    variance: 0.3,
    discount: 900,
    price: 1.5,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },

  {
    article: 38,
    deliveryTimeN: 1.7,
    deliveryTimeE: 0.9,
    variance: 0.4,
    discount: 300,
    price: 1.5,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 39,
    deliveryTimeN: 1.5,
    deliveryTimeE: 0.7,
    variance: 0.3,
    discount: 1800,
    price: 1.5,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 75,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 40,
    deliveryTimeN: 1.7,
    deliveryTimeE: 0.9,
    variance: 0.2,
    discount: 900,
    price: 2.5,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 41,
    deliveryTimeN: 0.9,
    deliveryTimeE: 0.5,
    variance: 0.2,
    discount: 900,
    price: 0.06,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 42,
    deliveryTimeN: 1.2,
    deliveryTimeE: 0.6,
    variance: 0.3,
    discount: 1800,
    price: 0.1,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 43,
    deliveryTimeN: 1.6,
    deliveryTimeE: 0.8,
    variance: 0.3,
    discount: 2700,
    price: 5,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 75,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 44,
    deliveryTimeN: 1.0,
    deliveryTimeE: 0.5,
    variance: 0.2,
    discount: 900,
    price: 0.5,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 45,
    deliveryTimeN: 1.7,
    deliveryTimeE: 0.9,
    variance: 0.3,
    discount: 900,
    price: 0.06,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },

  {
    article: 46,
    deliveryTimeN: 0.9,
    deliveryTimeE: 0.5,
    variance: 0.3,
    discount: 900,
    price: 0.1,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 47,
    deliveryTimeN: 1.1,
    deliveryTimeE: 0.5,
    variance: 0.1,
    discount: 900,
    price: 3.5,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 48,
    deliveryTimeN: 1.0,
    deliveryTimeE: 0.5,
    variance: 0.2,
    discount: 1800,
    price: 1.5,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 75,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 52,
    deliveryTimeN: 1.6,
    deliveryTimeE: 0.8,
    variance: 0.4,
    discount: 600,
    price: 22,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },

    {
    article: 53,
    deliveryTimeN: 1.6,
    deliveryTimeE: 0.8,
    variance: 0.2,
    discount: 22000,
    price: 0.1,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 57,
    deliveryTimeN: 1.7,
    deliveryTimeE: 0.9,
    variance: 0.3,
    discount: 22000,
    price: 22,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 58,
    deliveryTimeN: 1.6,
    deliveryTimeE: 0.8,
    variance: 0.5,
    discount: 22000,
    price: 0.1,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
  {
    article: 59,
    deliveryTimeN: 0.7,
    deliveryTimeE: 0.3,
    variance: 0.2,
    discount: 1800,
    price: 0.15,
    currentStock: 0,
    currentConsumption: 0,
    forecastn1: 0,
    forecastn2: 0,
    forecastn3: 0,
    orderCosts: 50,
    orderQuantity: 0,
    orderQuantityE: 0,
    gesamtkosten: 0,
    gesamtkostenE: 0,
    arrivingOrders: 0,
    ordersPeriodN: 0,
    ordersPeriodN1: 0,
    ordersPeriodN2: 0,
    ordersPeriodN3: 0,
    ordersPeriodNE: 0,
    ordersPeriodN1E: 0,
    ordersPeriodN2E: 0,
    ordersPeriodN3E: 0,
  },
];
