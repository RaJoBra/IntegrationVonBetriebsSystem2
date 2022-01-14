import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';

import { ProdPlanToolService } from '../prod-plan-tool.service';
import { FileUploadDialogComponent } from '../file-upload-dialog/file-upload-dialog.component';
import { FileUploadDialogTypesComponent } from '../file-upload-dialog-types/file-upload-dialog-types.component';

import { Forecast } from '../models/forecast';
import { Workstation } from '../models/workstation';
import { Article } from '../models/article';
import { FutureInwardStockMovement } from '../models/futureInwardStockMovement';
import { Queue } from '../models/queue';
import { BillOfMaterials } from '../models/billOfMaterials';
import { Order } from '../models/order';
import { Capacity } from '../models/capacity';
import { DirectSales } from '../models/directSales';

import { Workstations } from '../shared/workstations';
import { BillsOfMaterials } from '../shared/billsOfMaterials';
import { Discounts } from '../shared/discounts';
import { Deliverytimes } from '../shared/deliverytimes';
import { Variances } from '../shared/variances';
import { NgxSpinnerService } from 'ngx-spinner';
import { Purchase } from '../models/purchase';
import { ProcessNavbarComponent } from '../process-navbar/process-navbar.component';
import { IdleTimeCost } from '../models/idleTimeCost';
import { StrategicData } from '../models/strategicData';

import {parseString} from 'xml2js';
import { Router } from '@angular/router';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {

  fileUploaded: boolean = false;
  periodeAlt: any;
  xmlString?: string = '';

  sanitizer: DomSanitizer;
  PartIds: number[] = [
    1,
    51,
    50,
    4,
    10,
    49,
    7,
    13,
    18, // P1
    2,
    56,
    55,
    5,
    11,
    54,
    8,
    14,
    19, // P2
    3,
    31,
    30,
    6,
    12,
    29,
    9,
    15,
    20, // P3
    26,
    16,
    17, // Multiple Used Parts
  ];
  //hier wie parts ID darauf beziehen

  constructor(
    private prodPlanToolService: ProdPlanToolService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getWorkstation();
    this.getForecasts();
    this.getArticles();
    this.getFutureInwardStockMovements();
    this.getQueues();
    this.getBillsOfMaterials();
    this.getDirectSales();
    this.getStrategicDatas();
    this.getIdleTimeCosts();
  }

  getWorkstation(): void {
    this.prodPlanToolService.getWorkstations().subscribe();
  }

  addWorkstation(wokstation: Workstation): void {
    this.prodPlanToolService
      .addWorkstation(wokstation)
      .subscribe((res) => console.log(res));
  }

  getForecasts(): void {
    this.prodPlanToolService.getForecasts().subscribe();
  }

  addForecast(forecast: Forecast) {
    this.prodPlanToolService
      .addForecast(forecast)
      .subscribe((res) => console.log(res));
  }

  addInitialForecasts() {
    for (let i = 2; i < 5; i++) {
      let forecast: Forecast = {
        id: i,
        period: 0,
        article1: 0,
        article2: 0,
        article3: 0,
        pss1: 0,
        pss2: 0,
        pss3: 0,
      };
      this.addForecast(forecast);
    }
  }

  getDirectSales(): void {
    this.prodPlanToolService.getDirectSales().subscribe();
  }

  addDirectSale(directSale: DirectSales) {
    this.prodPlanToolService
      .addDirectSale(directSale)
      .subscribe((res) => console.log(res));
  }

  addInitialDirectSales() {
    let directSale: DirectSales = {
      id: 1,
      quantity1: 0,
      quantity2: 0,
      quantity3: 0,
      price1: 0,
      price2: 0,
      price3: 0,
      penalty1: 0,
      penalty2: 0,
      penalty3: 0,
    };
    this.addDirectSale(directSale);
  }

  getArticles(): void {
    this.prodPlanToolService.getArticles().subscribe();
  }

  addArticle(article: Article): void {
    this.prodPlanToolService
      .addArticle(article)
      .subscribe((res) => console.log(res));
  }

  addOrder(order: Order) {
    this.prodPlanToolService
      .addOrder(order)
      .subscribe((res) => console.log(res));
  }

  addInitialOrders() {
    for (const item of this.PartIds) {
      let order: Order = {
        id: item,
        article: item,
        amount: 0,
        priority: item,
        stockvalue: 0,
      };
      this.addOrder(order);
    }
  }

  addCapacity(capacity: Capacity) {
    this.prodPlanToolService
      .addCapacity(capacity)
      .subscribe((res) => console.log(res));
  }

  addInitialCapacities() {
    for (let i = 1; i < 16; i++) {
      if (i === 5) {
        continue;
      }
      let capacity: Capacity = {
        id: i,
        workstation: i,
        shift: 0,
        overtime: 0,
        capacity: 0,
        buffer: 0,
      };
      this.addCapacity(capacity);
    }
  }

  addPurchase(purchase: Purchase) {
    this.prodPlanToolService.addPurchase(purchase).subscribe();
  }

  addInitialPurchases() {
    for (let i = 1; i < 29; i++) {
      let purchase: Purchase = {
        id: i,
        article: 0,
        amount: 0,
        type: 5, //normal 5 //eilt 4
      };
      this.addPurchase(purchase);
    }
  }

  getFutureInwardStockMovements(): void {
    this.prodPlanToolService.getFutureInwardStockMovements().subscribe();
  }

  addFutureInwardStockMovement(
    futureInwardStockMovement: FutureInwardStockMovement
  ): void {
    this.prodPlanToolService
      .addFutureInwardStockMovement(futureInwardStockMovement)
      .subscribe((res) => console.log(res));
  }

  getQueues(): void {
    this.prodPlanToolService.getQueues().subscribe();
  }

  addQueue(queue: Queue): void {
    this.prodPlanToolService
      .addQueue(queue)
      .subscribe((res) => console.log(res));
  }

  getBillsOfMaterials(): void {
    this.prodPlanToolService.getBillsOfMaterials().subscribe();
  }

  addBillOfMaterials(billOfMaterials: BillOfMaterials): void {
    this.prodPlanToolService
      .addBillOfMaterials(billOfMaterials)
      .subscribe((res) => console.log(res));
  }

  getStrategicDatas(): void {
    this.prodPlanToolService.getStrategicDatas().subscribe();
  }

  addStrategicData(strategicData: StrategicData): void {
    this.prodPlanToolService
      .addStrategicData(strategicData)
      .subscribe((res) => console.log(res));
  }

  getIdleTimeCosts(): void {
    this.prodPlanToolService.getIdleTimeCosts().subscribe();
  }

  addIdleTimeCost(idleTimeCost: IdleTimeCost): void {
    this.prodPlanToolService
      .addIdleTimeCost(idleTimeCost)
      .subscribe((res) => console.log(res));
  }

  // retuns boolean if a file is alredy uploaded
  getProgress() {
    return ProcessNavbarComponent.progress;
  }

  redirectToNextPage() {
    this.router.navigate(['/production-program']);
  }

  // will be executed as soon as a file has been uploaded
  onFileInput(files: FileList | null): void {

    let file: File = null;
    if (files) {
      file = files.item(0);

        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.xmlString = fileReader.result?.toString();
          parseString(fileReader.result, (err: any, res: any) => {
            this.periodeAlt = res.results.$.period;
            this.fileUploaded = true;
            console.log('last period:', this.periodeAlt);
          })
        };
        fileReader.readAsText(file);


      if (file.type === 'text/xml') {
      // if (this.periodeAlt) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          // Displays spinner for 3 seconds, which is defined in HTML code
          this.spinner.show();

          // Adding initial orders to db
          this.addInitialOrders();

          // Adding initial capacities to db
          this.addInitialCapacities();

          // Adding workstations to db
          const workstations = Workstations.workstations;
          for (const workstation of workstations) {
            this.addWorkstation(workstation);
          }

          // Adding bills of materials to db
          const billsOfMaterials = BillsOfMaterials.billsOfMaterials;
          for (const billOfMaterials of billsOfMaterials) {
            this.addBillOfMaterials(billOfMaterials);
          }

          const parser = new DOMParser();

          const xml = parser.parseFromString(
            fileReader.result as string,
            'application/xml'
          );

          this.addIdleTimeCostsToDB(xml);

          this.addStrategicDatasToDB(xml);

          const period = this.addForecastToDB(xml);
          // this.periodeAlt = this.getPeriod(xml);
          this.addInitialForecasts();
          this.addInitialDirectSales();

          const deliverytimes = Deliverytimes.deliverytimes;
          this.addWarehouseStockToDB(xml, deliverytimes);

          this.addFutureInwardStockMovementToDB(xml, deliverytimes, period);

          this.addQueuesToDB(xml);

          // Sets the status if a file is uploaded to prevent
          ProcessNavbarComponent.progress = true;

          // Hides/ends spinner after 3 seconds
          setTimeout(() => {
            this.spinner.hide();
          }, 4000);
        };

        fileReader.readAsText(file);
        ProcessNavbarComponent.productionProgram = true;
        this.redirectToNextPage();

      } else {
        this.openDialogTypes(file.type);
      }
    } 
  }

  private addQueuesToDB(xml: Document) {
    // Adding waitinglist workstations to db
    let id = 1;
    let nodes;
    for (let i = 0; i < 15; i++) {
      const workstation = xml.evaluate(
        `/results/waitinglistworkstations/workplace[${i}]/@id`,
        xml,
        null,
        XPathResult.NUMBER_TYPE,
        null
      ).numberValue
      if (
        xml.evaluate(
          'count(/results/waitinglistworkstations/workplace[' +
            i +
            ']/waitinglist)',
          xml,
          null,
          XPathResult.NUMBER_TYPE,
          null
        ).numberValue > 0
      ) {
        nodes = xml.evaluate(
          'count(/results/waitinglistworkstations/workplace[' +
            i +
            ']/waitinglist)',
          xml,
          null,
          XPathResult.NUMBER_TYPE,
          null
        ).numberValue;

        for (let j = 1; j <= nodes; j++) {
          const article = xml.evaluate(
            '/results/waitinglistworkstations/workplace[' +
              i +
              ']/waitinglist[' +
              j +
              ']/@item',
            xml,
            null,
            XPathResult.NUMBER_TYPE,
            null
          ).numberValue;
          const amount = xml.evaluate(
            '/results/waitinglistworkstations/workplace[' +
              i +
              ']/waitinglist[' +
              j +
              ']/@amount',
            xml,
            null,
            XPathResult.NUMBER_TYPE,
            null
          ).numberValue;
          const time = xml.evaluate(
            '/results/waitinglistworkstations/workplace[' +
              i +
              ']/waitinglist[' +
              j +
              ']/@timeneed',
            xml,
            null,
            XPathResult.NUMBER_TYPE,
            null
          ).numberValue;

          this.addQueue({
            id: id,
            article: article,
            amount: amount,
            time: time,
            workstation: workstation,
            inwork: false,
          });

          id++;
        }
      }
    }

    // Adding orders in work to db
    nodes = xml.evaluate(
      'count(/results/ordersinwork/*)',
      xml,
      null,
      XPathResult.NUMBER_TYPE,
      null
    ).numberValue;

    if (nodes > 0) {
      for (let i = 1; i <= nodes; i++) {
        const article = xml.evaluate(
          '/results/ordersinwork/workplace[' + i + ']/@item',
          xml,
          null,
          XPathResult.NUMBER_TYPE,
          null
        ).numberValue;
        const amount = xml.evaluate(
          '/results/ordersinwork/workplace[' + i + ']/@amount',
          xml,
          null,
          XPathResult.NUMBER_TYPE,
          null
        ).numberValue;
        const time = xml.evaluate(
          '/results/ordersinwork/workplace[' + i + ']/@timeneed',
          xml,
          null,
          XPathResult.NUMBER_TYPE,
          null
        ).numberValue;
        const workstation = xml.evaluate(
          '/results/ordersinwork/workplace[' + i + ']/@id',
          xml,
          null,
          XPathResult.NUMBER_TYPE,
          null
        ).numberValue;

        this.addQueue({
          id: id,
          article: article,
          amount: amount,
          time: time,
          workstation: workstation,
          inwork: true,
        });

        id++;
      }
    }

    // Adding waitinglist material to db
    nodes = xml.evaluate(
      'count(/results/waitingliststock/*)',
      xml,
      null,
      XPathResult.NUMBER_TYPE,
      null
    ).numberValue;
    for (let i = 1; i <= nodes; i++) {
      if (
        xml.evaluate(
          'count(/results/waitingliststock/missingpart[' +
            i +
            ']/workplace/@id)',
          xml,
          null,
          XPathResult.NUMBER_TYPE,
          null
        ).numberValue > 0
      ) {
        const article = xml.evaluate(
          '/results/waitingliststock/missingpart[' +
            i +
            ']/workplace/waitinglist/@item',
          xml,
          null,
          XPathResult.NUMBER_TYPE,
          null
        ).numberValue;
        const amount = xml.evaluate(
          '/results/waitingliststock/missingpart[' +
            i +
            ']/workplace/waitinglist/@amount',
          xml,
          null,
          XPathResult.NUMBER_TYPE,
          null
        ).numberValue;
        const time = xml.evaluate(
          '/results/waitingliststock/missingpart[' +
            i +
            ']/workplace/waitinglist/@timeNeed',
          xml,
          null,
          XPathResult.NUMBER_TYPE,
          null
        ).numberValue;
        const workstation = xml.evaluate(
          '/results/waitingliststock/missingpart[' + i + ']/workplace/@id',
          xml,
          null,
          XPathResult.NUMBER_TYPE,
          null
        ).numberValue;

        this.addQueue({
          id: id,
          article: article,
          amount: amount,
          time: time,
          workstation: workstation,
          inwork: false,
        });

        id++;
      }
    }
  }

  private addFutureInwardStockMovementToDB(
    xml: Document,
    deliverytimes: Map<number, number>,
    period: number
  ) {
    let nodes = xml.evaluate(
      'count(/results/futureinwardstockmovement/*)',
      xml,
      null,
      XPathResult.NUMBER_TYPE,
      null
    ).numberValue;

    for (let id = 1; id <= nodes; id++) {
      const article = xml.evaluate(
        '/results/futureinwardstockmovement/order[' + id + ']/@article',
        xml,
        null,
        XPathResult.NUMBER_TYPE,
        null
      ).numberValue;
      const orderPeriod = xml.evaluate(
        '/results/futureinwardstockmovement/order[' + id + ']/@orderperiod',
        xml,
        null,
        XPathResult.NUMBER_TYPE,
        null
      ).numberValue;
      const deliverytime = deliverytimes.get(article);
      const decimal = deliverytime - Math.floor(deliverytime);
      let arrivingPeriod = 0;
      if (decimal > 0.8) {
        arrivingPeriod = Math.floor(orderPeriod + Math.floor(deliverytime + 1));
      } else {
        arrivingPeriod = Math.floor(orderPeriod + deliverytime);
      }
      if (arrivingPeriod === period) {
        arrivingPeriod += 1;
      }
      const mode = xml.evaluate(
        '/results/futureinwardstockmovement/order[' + id + ']/@mode',
        xml,
        null,
        XPathResult.NUMBER_TYPE,
        null
      ).numberValue;
      let amount = xml.evaluate(
        '/results/futureinwardstockmovement/order[' + id + ']/@amount',
        xml,
        null,
        XPathResult.NUMBER_TYPE,
        null
      ).numberValue;

      this.addFutureInwardStockMovement({
        id: id,
        article: article,
        orderPeriod: orderPeriod,
        arrivingPeriod: arrivingPeriod,
        mode: mode,
        amount: amount,
      });
    }
  }

  private addWarehouseStockToDB(
    xml: Document,
    deliverytimes: Map<number, number>
  ) {
    const discounts = Discounts.discounts;
    const variances = Variances.variances;
    for (let id = 1; id <= 59; id++) {
      const amount = xml.evaluate(
        `/results/warehousestock/article[${id}]/@amount`,
        xml,
        null,
        XPathResult.NUMBER_TYPE,
        null
      ).numberValue;
      const price = Number(
        xml
          .evaluate(
            `/results/warehousestock/article[${id}]/@price`,
            xml,
            null,
            XPathResult.STRING_TYPE,
            null
          )
          .stringValue.replace(',', '.')
      );
      let discount;
      let deliverytime;
      let variance;
      if (discounts.has(id)) {
        discount = discounts.get(id);
        deliverytime = deliverytimes.get(id);
        variance = variances.get(id);
      } else {
        discount = 0;
        deliverytime = 0;
        variance = 0;
      }
      this.addArticle({
        id: id,
        amount: amount,
        discount: discount,
        price: price,
        deliverytime: deliverytime,
        variance: variance,
        plannedSafetyStock: 0,
        additionalWarehouseStock: 0,
        production: 0,
      });
    }
  }

  private getPeriod(xml: Document) {
    const period = xml.evaluate(
      '/results/@period',
      xml,
      null,
      XPathResult.NUMBER_TYPE,
      null
    ).numberValue;
    return period;
  }

  private addForecastToDB(xml: Document) {
    const period = xml.evaluate(
      '/results/@period',
      xml,
      null,
      XPathResult.NUMBER_TYPE,
      null
    ).numberValue;
    const p1 = xml.evaluate(
      '/results/forecast/@p1',
      xml,
      null,
      XPathResult.NUMBER_TYPE,
      null
    ).numberValue;
    const p2 = xml.evaluate(
      '/results/forecast/@p2',
      xml,
      null,
      XPathResult.NUMBER_TYPE,
      null
    ).numberValue;
    const p3 = xml.evaluate(
      '/results/forecast/@p3',
      xml,
      null,
      XPathResult.NUMBER_TYPE,
      null
    ).numberValue;
    this.addForecast({
      id: 1,
      period: period,
      article1: p1,
      article2: p2,
      article3: p3,
      pss1: 0,
      pss2: 0,
      pss3: 0,
    });
    return period;
  }

  private addStrategicDatasToDB(xml: Document) {
    const totalStockValue = Number(
      xml
        .evaluate(
          '/results/warehousestock/totalstockvalue/text()',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const totalSetupEvents = Number(
      xml
        .evaluate(
          '/results/idletimecosts/sum/@setupevents',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const totalWageIdleTimeCosts = Number(
      xml
        .evaluate(
          '/results/idletimecosts/sum/@wageidletimecosts',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const totalWageCosts = Number(
      xml
        .evaluate(
          '/results/idletimecosts/sum/@wagecosts',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const totalMachineIdleTimeCosts = Number(
      xml
        .evaluate(
          '/results/idletimecosts/sum/@machineidletimecosts',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const normalCapacityCurrent = Number(
      xml
        .evaluate(
          '/results/result/general/capacity/@current',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const normalCapacityAverage = Number(
      xml
        .evaluate(
          '/results/result/general/capacity/@average',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const possibleCapacityCurrent = Number(
      xml
        .evaluate(
          '/results/result/general/possiblecapacity/@current',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const possibleCapacityAverage = Number(
      xml
        .evaluate(
          '/results/result/general/possiblecapacity/@average',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const relPossibleNormalCapacityCurrent = Number(
      xml
        .evaluate(
          '/results/result/general/relpossiblenormalcapacity/@current',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
        .replace('%', '')
    );
    const relPossibleNormalCapacityAverage = Number(
      xml
        .evaluate(
          '/results/result/general/relpossiblenormalcapacity/@average',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
        .replace('%', '')
    );
    const productiveTimeCurrent = Number(
      xml
        .evaluate(
          '/results/result/general/productivetime/@current',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const productiveTimeAverage = Number(
      xml
        .evaluate(
          '/results/result/general/productivetime/@average',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const effiencyCurrent = Number(
      xml
        .evaluate(
          '/results/result/general/effiency/@current',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
        .replace('%', '')
    );
    const effiencyAverage = Number(
      xml
        .evaluate(
          '/results/result/general/effiency/@average',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
        .replace('%', '')
    );
    const sellwishCurrent = Number(
      xml
        .evaluate(
          '/results/result/general/sellwish/@current',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const sellwishAverage = Number(
      xml
        .evaluate(
          '/results/result/general/sellwish/@average',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const salesQuantityCurrent = Number(
      xml
        .evaluate(
          '/results/result/general/salesquantity/@current',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const salesQuantityAverage = Number(
      xml
        .evaluate(
          '/results/result/general/salesquantity/@average',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const deliveryReliabilityCurrent = Number(
      xml
        .evaluate(
          '/results/result/general/deliveryreliability/@current',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
        .replace('%', '')
    );
    const deliveryReliabilityAverage = Number(
      xml
        .evaluate(
          '/results/result/general/deliveryreliability/@average',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
        .replace('%', '')
    );
    const idleTimeCurrent = Number(
      xml
        .evaluate(
          '/results/result/general/idletime/@current',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const idleTimeAverage = Number(
      xml
        .evaluate(
          '/results/result/general/idletime/@average',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const idleTimeCostsCurrent = Number(
      xml
        .evaluate(
          '/results/result/general/idletimecosts/@current',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const idleTimeCostsAverage = Number(
      xml
        .evaluate(
          '/results/result/general/idletimecosts/@average',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const storeValueCurrent = Number(
      xml
        .evaluate(
          '/results/result/general/storevalue/@current',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const storeValueAverage = Number(
      xml
        .evaluate(
          '/results/result/general/storevalue/@average',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const storageCostsCurrent = Number(
      xml
        .evaluate(
          '/results/result/general/storagecosts/@current',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const storageCostsAverage = Number(
      xml
        .evaluate(
          '/results/result/general/storagecosts/@average',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const quantityDefectiveGoodsCurrent = Number(
      xml
        .evaluate(
          '/results/result/defectivegoods/quantity/@current',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const quantityDefectiveGoodsAverage = Number(
      xml
        .evaluate(
          '/results/result/defectivegoods/quantity/@average',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const costsDefectiveGoodsCurrent = Number(
      xml
        .evaluate(
          '/results/result/defectivegoods/costs/@current',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const costsDefectiveGoodsAverage = Number(
      xml
        .evaluate(
          '/results/result/defectivegoods/costs/@average',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const normalSalesPriceCurrent = Number(
      xml
        .evaluate(
          '/results/result/normalsale/salesprice/@current',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const normalSalesPriceAverage = Number(
      xml
        .evaluate(
          '/results/result/normalsale/salesprice/@average',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const normalSaleProfitCurrent = Number(
      xml
        .evaluate(
          '/results/result/normalsale/profit/@current',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const normalSaleProfitAverage = Number(
      xml
        .evaluate(
          '/results/result/normalsale/profit/@average',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const directSaleProfitCurrent = Number(
      xml
        .evaluate(
          '/results/result/directsale/profit/@current',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const directSaleProfitAverage = Number(
      xml
        .evaluate(
          '/results/result/directsale/profit/@average',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const directSaleContractPenaltyCurrent = Number(
      xml
        .evaluate(
          '/results/result/directsale/contractpenalty/@current',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const directSaleContractPenaltyAverage = Number(
      xml
        .evaluate(
          '/results/result/directsale/contractpenalty/@average',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const marketplaceSaleProfitCurrent = Number(
      xml
        .evaluate(
          '/results/result/marketplacesale/profit/@current',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const marketplaceSaleProfitAverage = Number(
      xml
        .evaluate(
          '/results/result/marketplacesale/profit/@average',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const totalProfitCurrent = Number(
      xml
        .evaluate(
          '/results/result/summary/profit/@current',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );
    const totalProfitAverage = Number(
      xml
        .evaluate(
          '/results/result/summary/profit/@average',
          xml,
          null,
          XPathResult.STRING_TYPE,
          null
        )
        .stringValue.replace(',', '.')
    );

    this.addStrategicData({
      id: 1,
      totalStockValue: totalStockValue,
      totalSetupEvents: totalSetupEvents,
      totalWageIdleTimeCosts: totalWageIdleTimeCosts,
      totalWageCosts: totalWageCosts,
      totalMachineIdleTimeCosts: totalMachineIdleTimeCosts,
      normalCapacityCurrent: normalCapacityCurrent,
      normalCapacityAverage: normalCapacityAverage,
      possibleCapacityCurrent: possibleCapacityCurrent,
      possibleCapacityAverage: possibleCapacityAverage,
      relPossibleNormalCapacityCurrent: relPossibleNormalCapacityCurrent,
      relPossibleNormalCapacityAverage: relPossibleNormalCapacityAverage,
      productiveTimeCurrent: productiveTimeCurrent,
      productiveTimeAverage: productiveTimeAverage,
      effiencyCurrent: effiencyCurrent,
      effiencyAverage: effiencyAverage,
      sellwishCurrent: sellwishCurrent,
      sellwishAverage: sellwishAverage,
      salesQuantityCurrent: salesQuantityCurrent,
      salesQuantityAverage: salesQuantityAverage,
      deliveryReliabilityCurrent: deliveryReliabilityCurrent,
      deliveryReliabilityAverage: deliveryReliabilityAverage,
      idleTimeCurrent: idleTimeCurrent,
      idleTimeAverage: idleTimeAverage,
      idleTimeCostsCurrent: idleTimeCostsCurrent,
      idleTimeCostsAverage: idleTimeCostsAverage,
      storeValueCurrent: storeValueCurrent,
      storeValueAverage: storeValueAverage,
      storageCostsCurrent: storageCostsCurrent,
      storageCostsAverage: storageCostsAverage,
      quantityDefectiveGoodsCurrent: quantityDefectiveGoodsCurrent,
      quantityDefectiveGoodsAverage: quantityDefectiveGoodsAverage,
      costsDefectiveGoodsCurrent: costsDefectiveGoodsCurrent,
      costsDefectiveGoodsAverage: costsDefectiveGoodsAverage,
      normalSalesPriceCurrent: normalSalesPriceCurrent,
      normalSalesPriceAverage: normalSalesPriceAverage,
      normalSaleProfitCurrent: normalSaleProfitCurrent,
      normalSaleProfitAverage: normalSaleProfitAverage,
      directSaleProfitCurrent: directSaleProfitCurrent,
      directSaleProfitAverage: directSaleProfitAverage,
      directSaleContractPenaltyCurrent: directSaleContractPenaltyCurrent,
      directSaleContractPenaltyAverage: directSaleContractPenaltyAverage,
      marketplaceSaleProfitCurrent: marketplaceSaleProfitCurrent,
      marketplaceSaleProfitAverage: marketplaceSaleProfitAverage,
      totalProfitCurrent: totalProfitCurrent,
      totalProfitAverage: totalProfitAverage,
    });
  }

  private addIdleTimeCostsToDB(xml: Document) {
    for (let i = 1; i < 15; i++) {
      const setupEvents = xml.evaluate(
        `/results/idletimecosts/workplace[${i}]/@setupevents`,
        xml,
        null,
        XPathResult.NUMBER_TYPE,
        null
      ).numberValue;
      const idleTime = xml.evaluate(
        `/results/idletimecosts/workplace[${i}]/@idletime`,
        xml,
        null,
        XPathResult.NUMBER_TYPE,
        null
      ).numberValue;
      const wageIdletimeCosts = Number(
        xml
          .evaluate(
            `/results/idletimecosts/workplace[${i}]/@wageidletimecosts`,
            xml,
            null,
            XPathResult.STRING_TYPE,
            null
          )
          .stringValue.replace(',', '.')
      );
      const wageCosts = Number(
        xml
          .evaluate(
            `/results/idletimecosts/workplace[${i}]/@wagecosts`,
            xml,
            null,
            XPathResult.STRING_TYPE,
            null
          )
          .stringValue.replace(',', '.')
      );
      const machineIdleTimeCosts = Number(
        xml
          .evaluate(
            `/results/idletimecosts/workplace[${i}]/@machineidletimecosts`,
            xml,
            null,
            XPathResult.STRING_TYPE,
            null
          )
          .stringValue.replace(',', '.')
      );
      this.addIdleTimeCost({
        id: i,
        setupEvents: setupEvents,
        idleTime: idleTime,
        wageIdletimeCosts: wageIdletimeCosts,
        wageCosts: wageCosts,
        machineIdleTimeCosts: machineIdleTimeCosts,
      });
    }
  }

  // Opens a dialog to inform about wrong file type
  openDialogTypes(type: string) {
    const dialogRef = this.dialog.open(FileUploadDialogTypesComponent, {
      data: { type: type },
    });
    dialogRef.afterClosed();
  }

  // Opens a dialog to reset the progress
  openDialog() {
    const dialogRef = this.dialog.open(FileUploadDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        window.location.reload();
      }
    });
  }
}
