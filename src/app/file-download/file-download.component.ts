import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ProdPlanToolService } from '../prod-plan-tool.service';

import { Forecast } from '../models/forecast';
import { Purchase } from '../models/purchase';
import { Order } from '../models/order';
import { Capacity } from '../models/capacity';
import { DirectSales } from '../models/directSales';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.css'],
})
export class FileDownloadComponent implements OnInit {
  fileUrl;
  forecasts: Forecast[];
  directSales: DirectSales[];
  purchases: Purchase[];
  orders: Order[];
  capacities: Capacity[];

  constructor(
    private sanitizer: DomSanitizer,
    private prodPlanToolService: ProdPlanToolService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show().then(() => {
      this.getAndSetData();
    });
  }

  // Gets the data from the database and updates the local data.
  getAndSetData(): void {
    // getForecast
    this.prodPlanToolService.getForecasts().subscribe((forecasts) => {
      this.forecasts = forecasts;
      // getDirectSales
      this.prodPlanToolService.getDirectSales().subscribe((directSales) => {
        this.directSales = directSales;
        // getPurchases
        this.prodPlanToolService.getPurchases().subscribe((purchases) => {
          this.purchases = purchases;
          // getOrders
          this.prodPlanToolService.getOrders().subscribe((orders) => {
            this.orders = orders;
            // getCapacities
            this.prodPlanToolService.getCapacities().subscribe((capacities) => {
              this.capacities = capacities;
              this.generateFile();
            });
          });
        });
      });
    });
  }

  // Creates the file which can be downloaded
  generateFile(): void {
    const data = this.getXMLString();
    const blob = new Blob([data], { type: 'application/xml' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      window.URL.createObjectURL(blob)
    );
    this.spinner.hide();
  }

  // Creates the content of the file
  getXMLString(): string {
    let xml =
      '<input>' +
      '<qualitycontrol type="no" losequantity="0" delay="0"/>' +
      // Forecast of period n to xml string
      '<sellwish>' +
      `<item article="1" quantity="${this.forecasts[0].article1}"/>` +
      `<item article="2" quantity="${this.forecasts[0].article2}"/>` +
      `<item article="3" quantity="${this.forecasts[0].article3}"/>` +
      '</sellwish>' +
      // Selldirect to xml string
      '<selldirect>' +
      `<item article="1" quantity="${this.directSales[0].quantity1}" price="${this.directSales[0].price1}" penalty="${this.directSales[0].penalty1}"/>` +
      `<item article="2" quantity="${this.directSales[0].quantity2}" price="${this.directSales[0].price2}" penalty="${this.directSales[0].penalty2}"/>` +
      `<item article="3" quantity="${this.directSales[0].quantity3}" price="${this.directSales[0].price3}" penalty="${this.directSales[0].penalty3}"/>` +
      '</selldirect>' +
      '<orderlist>';

    // Purchases to xml string
    for (let purchase of this.purchases) {
      if (purchase.amount <= 0) continue;

      xml =
        xml +
        `<order article="${purchase.article}" quantity="${purchase.amount}" modus="${purchase.type}"/>`;
    }

    xml = xml + '</orderlist>' + '<productionlist>';

    // Orders sorted by priority
    this.orders.sort((a, b) => {
      return a.priority - b.priority;
    });

    // Orders to xml string
    for (const order of this.orders) {
      if (order.amount <= 0) continue;

      xml =
        xml +
        `<production article="${order.article}" quantity="${order.amount}"/>`;
    }

    xml = xml + '</productionlist>' + '<workingtimelist>';

    // Capacities to xml string
    for (const capacity of this.capacities) {
      const totalCapacity = capacity.capacity + capacity.buffer;
      const oneShift = 2400;
      let shift = 1;
      let overtime = 0;
      if (totalCapacity > 6000) {
        shift = 3;
      } else if (totalCapacity > 4800) {
        shift = 2;
        overtime = (totalCapacity - shift * oneShift) / 5;
      } else if (totalCapacity > 3600) {
        shift = 2;
      } else if (totalCapacity > 2400) {
        overtime = (totalCapacity - shift * oneShift) / 5;
      }

      xml =
        xml +
        `<workingtime station="${capacity.workstation}" shift="${shift}" overtime="${overtime}"/>`;
    }

    xml = xml + '</workingtimelist></input>';

    return xml;
  }
}
