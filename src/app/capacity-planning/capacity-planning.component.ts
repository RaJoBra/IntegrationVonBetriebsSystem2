import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Forecast } from 'src/app/models/forecast';
import { Order } from 'src/app/models/order';
import { ProdPlanToolService } from 'src/app/prod-plan-tool.service';
import { Workstation } from '../models/workstation';
import { Queue } from '../models/queue';
import { Capacity } from '../models/capacity';
import { ProcessNavbarComponent } from '../process-navbar/process-navbar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgxSpinnerService } from 'ngx-spinner';


export interface CapacityPlanningElement {
  workstation: number;
  shift: number;
  overtime: number;
  capacityRequirements: number;
  capacityRequirementsBacklog: number;
  totalCapacityRequirements: number;
  setupTime: number;
  setupTimeBacklog: number;
  buffer: number;
  // tslint:disable-next-line:jsdoc-format
  /** id: number; article: number;  productionTime: number; capacity: number;*/
}

const ELEMENT_DATA: CapacityPlanningElement[] = [
  {
    workstation: 1,
    capacityRequirements: 0,
    setupTime: 0,
    capacityRequirementsBacklog: 0,
    setupTimeBacklog: 0,
    totalCapacityRequirements: 0,
    shift: 1,
    overtime: 0,
    buffer: 0,
  },
  {
    workstation: 2,
    capacityRequirements: 0,
    setupTime: 0,
    capacityRequirementsBacklog: 0,
    setupTimeBacklog: 0,
    totalCapacityRequirements: 0,
    shift: 1,
    overtime: 0,
    buffer: 0,
  },
  {
    workstation: 3,
    capacityRequirements: 0,
    setupTime: 0,
    capacityRequirementsBacklog: 0,
    setupTimeBacklog: 0,
    totalCapacityRequirements: 0,
    shift: 1,
    overtime: 0,
    buffer: 0,
  },
  {
    workstation: 4,
    capacityRequirements: 0,
    setupTime: 0,
    capacityRequirementsBacklog: 0,
    setupTimeBacklog: 0,
    totalCapacityRequirements: 0,
    shift: 1,
    overtime: 0,
    buffer: 0,
  },
  {
    workstation: 6,
    capacityRequirements: 0,
    setupTime: 0,
    capacityRequirementsBacklog: 0,
    setupTimeBacklog: 0,
    totalCapacityRequirements: 0,
    shift: 1,
    overtime: 0,
    buffer: 0,
  },
  {
    workstation: 7,
    capacityRequirements: 0,
    setupTime: 0,
    capacityRequirementsBacklog: 0,
    setupTimeBacklog: 0,
    totalCapacityRequirements: 0,
    shift: 1,
    overtime: 0,
    buffer: 0,
  },
  {
    workstation: 8,
    capacityRequirements: 0,
    setupTime: 0,
    capacityRequirementsBacklog: 0,
    setupTimeBacklog: 0,
    totalCapacityRequirements: 0,
    shift: 1,
    overtime: 0,
    buffer: 0,
  },
  {
    workstation: 9,
    capacityRequirements: 0,
    setupTime: 0,
    capacityRequirementsBacklog: 0,
    setupTimeBacklog: 0,
    totalCapacityRequirements: 0,
    shift: 1,
    overtime: 0,
    buffer: 0,
  },
  {
    workstation: 10,
    capacityRequirements: 0,
    setupTime: 0,
    capacityRequirementsBacklog: 0,
    setupTimeBacklog: 0,
    totalCapacityRequirements: 0,
    shift: 1,
    overtime: 0,
    buffer: 0,
  },
  {
    workstation: 11,
    capacityRequirements: 0,
    setupTime: 0,
    capacityRequirementsBacklog: 0,
    setupTimeBacklog: 0,
    totalCapacityRequirements: 0,
    shift: 1,
    overtime: 0,
    buffer: 0,
  },
  {
    workstation: 12,
    capacityRequirements: 0,
    setupTime: 0,
    capacityRequirementsBacklog: 0,
    setupTimeBacklog: 0,
    totalCapacityRequirements: 0,
    shift: 1,
    overtime: 0,
    buffer: 0,
  },
  {
    workstation: 13,
    capacityRequirements: 0,
    setupTime: 0,
    capacityRequirementsBacklog: 0,
    setupTimeBacklog: 0,
    totalCapacityRequirements: 0,
    shift: 1,
    overtime: 0,
    buffer: 0,
  },
  {
    workstation: 14,
    capacityRequirements: 0,
    setupTime: 0,
    capacityRequirementsBacklog: 0,
    setupTimeBacklog: 0,
    totalCapacityRequirements: 0,
    shift: 1,
    overtime: 0,
    buffer: 0,
  },
  {
    workstation: 15,
    capacityRequirements: 0,
    setupTime: 0,
    capacityRequirementsBacklog: 0,
    setupTimeBacklog: 0,
    totalCapacityRequirements: 0,
    shift: 1,
    overtime: 0,
    buffer: 0,
  },
];

@Component({
  selector: 'app-capacity-planning',
  templateUrl: './capacity-planning.component.html',
  styleUrls: ['./capacity-planning.component.css', '../app.component.css'],
})
export class CapacityPlanningComponent implements OnInit {
  displayedColumns: string[] = [
    'workstation',
    'capacityRequirements',
    'setupTime',
    'capacityRequirementsBacklog',
    'setupTimeBacklog',
    'totalCapacityRequirements',
    'shift',
    'overtime',
    'buffer',
  ];
  dataSource = ELEMENT_DATA;
  forecasts: Forecast[];
  workstations: Workstation[];
  articles: Article[];
  capacities: Capacity[];
  queues: Queue[];
  orders: Order[];
  loadedForecast: Promise<boolean>;
  loadedArticle: Promise<boolean>;
  loadedWorkstations: Promise<boolean>;
  loadedQueue: Promise<boolean>;
  loadedOrder: Promise<boolean>;
  loadedCapacity: Promise<boolean>;
  buffer: number;

  constructor(private prodPlanToolService: ProdPlanToolService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show().then(() => {
      this.getAndSetData();
    });
  }

  getAndSetData() {
    // getOrders
    this.prodPlanToolService.getOrders().subscribe((orders) => {
      this.orders = orders;

      // getForecast
      this.prodPlanToolService.getForecasts().subscribe((forcasts) => {
        this.forecasts = forcasts;
        // getArticles
        this.prodPlanToolService.getArticles().subscribe((articles) => {
          this.articles = articles;
          // getQueues
          this.prodPlanToolService.getQueues().subscribe((queues) => {
            this.queues = queues;
            // getWorkstations
            this.prodPlanToolService
              .getWorkstations()
              .subscribe((workstation) => {
                this.workstations = workstation;
                this.updateDataSource();
                this.updateCapacitiesInDatabase();
                this.spinner.hide();
              });
          });
        });
      });
    });
  }

  getForecasts() {
    this.prodPlanToolService.getForecasts().subscribe((forcasts) => {
      this.forecasts = forcasts;
    });
  }

  getWorkstations() {
    this.prodPlanToolService.getWorkstations().subscribe((workstations) => {
      this.workstations = workstations;
    });
  }
  getArticles() {
    this.prodPlanToolService.getArticles().subscribe((articles) => {
      this.articles = articles;
    });
  }

  getCapacities() {
    this.prodPlanToolService.getCapacities().subscribe((capacities) => {
      this.capacities = capacities;
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
      console.log(orders);
    });
  }

  updateCapacity(capacity: Capacity) {
    this.prodPlanToolService.updateCapacity(capacity).subscribe();
  }

  updateBuffer(row) {
    // Checks what workstations buffer has been changed.
    let counter;

    if (row.workstation <= 4) {
      counter = row.workstation - 1;
    }

    if (row.workstation >= 6) {
      counter = row.workstation - 2;
    }
    this.buffer = parseInt(row.buffer);

    // Forecasts[0] is the forecast for the period n.
    const capacity = {
      id: this.dataSource[counter].workstation,
      workstation: this.dataSource[counter].workstation,
      shift: this.dataSource[counter].shift,
      overtime: this.dataSource[counter].overtime,
      capacity: this.dataSource[counter].totalCapacityRequirements,
      buffer: this.buffer,
    };
    console.log(capacity);
    this.updateCapacity(capacity);
  }

  updateCapacitiesInDatabase() {
    for (let i = 0; i < 14; i++) {
      let capacity: Capacity = {
        id: this.dataSource[i].workstation,
        workstation: this.dataSource[i].workstation,
        shift: this.dataSource[i].shift,
        overtime: this.dataSource[i].overtime,
        capacity: this.dataSource[i].totalCapacityRequirements,
        buffer: this.dataSource[i].buffer,
      };
      this.updateCapacity(capacity);
    }
    this.updateDataSource();
  }

  updateDataSource() {
    //  Workstation 1

    // Capacity Requriement
    // Alle Artikel die in der Workstation 1 hergestellt werden, sollen hier addiert werden
    let article29 = this.orders.find((orders) => orders.article === 29);
    let article49 = this.orders.find((orders) => orders.article === 49);
    let article54 = this.orders.find((orders) => orders.article === 54);

    //Updaten der DataSource
    this.dataSource[0].capacityRequirements =
      article29.amount * 6 + article49.amount * 6 + article54.amount * 6;

    //Set Up Time
    //Deklaration
    let s29 = 0;
    let s49 = 0;
    let s54 = 0;

    //Prüfen ob Artikel produziert werden soll wenn ja wird die jeweilige Set Up Time gesetzt
    if (article29.amount > 0) {
      s29 = 20;
    }

    if (article49.amount > 0) {
      s49 = 20;
    }

    if (article54.amount > 0) {
      s54 = 20;
    }

    // Addieren der Setup Time und anschließend Data Source Updaten
    let setupTime1 = s29 + s49 + s54;
    this.dataSource[0].setupTime = setupTime1;

    //Backlogs
    //Capacity Planning Backlog
    let workstation1Backlog = this.queues.filter(
      (queues) => queues.workstation === 1
    );

    let capacityRequirementsBacklog1 = 0;
    let setupTimeBacklog1 = 0;
    let workstation1 = this.workstations.filter(workstation => workstation.workstation === 1);
    for (let i = 0; i < workstation1Backlog.length; i++) {
      capacityRequirementsBacklog1 += workstation1Backlog[i].time;
      if(workstation1Backlog[i].inwork === false) {
        setupTimeBacklog1 += workstation1.find(workstation => workstation.article === workstation1Backlog[i].article).setupTime;
      }
    }
    this.dataSource[0].capacityRequirementsBacklog =
      capacityRequirementsBacklog1;
    this.dataSource[0].setupTimeBacklog = setupTimeBacklog1;

    //  Workstation 2

    // Capacity Requriement
    // Alle Artikel die in der Workstation 2 hergestellt werden, sollen hier addiert werden
    let article50 = this.orders.find((orders) => orders.article === 50);
    let article55 = this.orders.find((orders) => orders.article === 55);
    let article30 = this.orders.find((orders) => orders.article === 30);

    //Updaten der DataSource
    this.dataSource[1].capacityRequirements =
      article50.amount * 5 + article55.amount * 5 + article30.amount * 5;

    //Set Up Time
    //Deklaration
    let s50 = 0;
    let s55 = 0;
    let s30 = 0;

    //Prüfen ob Artikel produziert werden soll wenn ja wird die jeweilige Set Up Time gesetzt
    if (article50.amount > 0) {
      s50 = 30;
    }

    if (article49.amount > 0) {
      s49 = 30;
    }

    if (article30.amount > 0) {
      s30 = 20;
    }

    // Addieren der Setup Time und anschließend Data Source Updaten
    let setupTime2 = s50 + s55 + s30;
    this.dataSource[1].setupTime = setupTime2;

    //Backlogs
    //Capacity Planning Backlog
    let workstation2Backlog = this.queues.filter(
      (queues) => queues.workstation === 2
    );

    let capacityRequirementsBacklog2 = 0;
    let setupTimeBacklog2 = 0;
    let workstation2 = this.workstations.filter(workstation => workstation.workstation === 2);
    for (let i = 0; i < workstation2Backlog.length; i++) {
      capacityRequirementsBacklog2 += workstation2Backlog[i].time;
      if(workstation2Backlog[i].inwork === false) {
        setupTimeBacklog2 += workstation2.find(workstation => workstation.article === workstation2Backlog[i].article).setupTime;
      }
    }
    this.dataSource[1].capacityRequirementsBacklog =
      capacityRequirementsBacklog2;
    this.dataSource[1].setupTimeBacklog = setupTimeBacklog2;

    //  Workstation 3

    // Capacity Requriement
    // Alle Artikel die in der Workstation 1 hergestellt werden, sollen hier addiert werden
    let article51 = this.orders.find((orders) => orders.article === 51);
    let article56 = this.orders.find((orders) => orders.article === 56);
    let article31 = this.orders.find((orders) => orders.article === 31);

    //Updaten der DataSource
    this.dataSource[2].capacityRequirements =
      article51.amount * 5 + article56.amount * 6 + article31.amount * 6;

    //Set Up Time
    //Deklaration
    let s51 = 0;
    let s56 = 0;
    let s31 = 0;

    //Prüfen ob Artikel produziert werden soll wenn ja wird die jeweilige Set Up Time gesetzt
    if (article51.amount > 0) {
      s51 = 20;
    }

    if (article56.amount > 0) {
      s56 = 20;
    }

    if (article31.amount > 0) {
      s31 = 20;
    }

    // Addieren der Setup Time und anschließend Data Source Updaten
    let setupTime3 = s51 + s56 + s31;
    this.dataSource[2].setupTime = setupTime3;

    //Backlogs
    //Capacity Planning Backlog
    let workstation3Backlog = this.queues.filter(
      (queues) => queues.workstation === 3
    );

    let capacityRequirementsBacklog3 = 0;
    let setupTimeBacklog3 = 0;
    let workstation3 = this.workstations.filter(workstation => workstation.workstation === 3);
    for (let i = 0; i < workstation3Backlog.length; i++) {
      capacityRequirementsBacklog3 += workstation3Backlog[i].time;
      if(workstation3Backlog[i].inwork === false) {
        setupTimeBacklog3 += workstation3.find(workstation => workstation.article === workstation3Backlog[i].article).setupTime;
      }
    }
    this.dataSource[2].capacityRequirementsBacklog =
      capacityRequirementsBacklog3;
    this.dataSource[2].setupTimeBacklog = setupTimeBacklog3;

    //  Workstation 4

    // Capacity Requriement
    // Alle Artikel die in der Workstation 4 hergestellt werden, sollen hier addiert werden
    let article1 = this.orders.find((orders) => orders.article === 1);
    let article2 = this.orders.find((orders) => orders.article === 2);
    let article3 = this.orders.find((orders) => orders.article === 3);

    //Updaten der DataSource
    this.dataSource[3].capacityRequirements =
      article1.amount * 6 + article2.amount * 7 + article3.amount * 7;

    //Set Up Time
    //Deklaration
    let s1 = 0;
    let s2 = 0;
    let s3 = 0;

    //Prüfen ob Artikel produziert werden soll wenn ja wird die jeweilige Set Up Time gesetzt
    if (article1.amount > 0) {
      s1 = 30;
    }

    if (article2.amount > 0) {
      s2 = 20;
    }

    if (article3.amount > 0) {
      s3 = 30;
    }

    // Addieren der Setup Time und anschließend Data Source Updaten
    let setupTime4 = s1 + s2 + s3;
    this.dataSource[3].setupTime = setupTime4;

    //Backlogs
    //Capacity Planning Backlog
    let workstation4Backlog = this.queues.filter(
      (queues) => queues.workstation === 4
    );

    let capacityRequirementsBacklog4 = 0;
    let setupTimeBacklog4 = 0;
    let workstation4 = this.workstations.filter(workstation => workstation.workstation === 4);
    for (let i = 0; i < workstation4Backlog.length; i++) {
      capacityRequirementsBacklog4 += workstation4Backlog[i].time;
      if(workstation4Backlog[i].inwork === false) {
        setupTimeBacklog4 += workstation4.find(workstation => workstation.article === workstation4Backlog[i].article).setupTime;
      }
    }
    this.dataSource[3].capacityRequirementsBacklog =
      capacityRequirementsBacklog4;
    this.dataSource[3].setupTimeBacklog = setupTimeBacklog4;

    //  Workstation 6

    // Capacity Requriement
    // Alle Artikel die in der Workstation 4 hergestellt werden, sollen hier addiert werden
    let article16 = this.orders.find((orders) => orders.article === 16);
    let article18 = this.orders.find((orders) => orders.article === 18);
    let article19 = this.orders.find((orders) => orders.article === 19);
    let article20 = this.orders.find((orders) => orders.article === 20);

    //Updaten der DataSource
    this.dataSource[4].capacityRequirements =
      article16.amount * 2 +
      article18.amount * 3 +
      article19.amount * 3 +
      article20.amount * 3;

    //Set Up Time
    //Deklaration
    let s16 = 0;
    let s18 = 0;
    let s19 = 0;
    let s20 = 0;

    //Prüfen ob Artikel produziert werden soll wenn ja wird die jeweilige Set Up Time gesetzt
    if (article16.amount > 0) {
      s16 = 15;
    }

    if (article18.amount > 0) {
      s18 = 15;
    }

    if (article19.amount > 0) {
      s19 = 15;
    }

    if (article20.amount > 0) {
      s20 = 15;
    }

    // Addieren der Setup Time und anschließend Data Source Updaten
    let setupTime6 = s16 + s18 + s19 + s20;
    this.dataSource[4].setupTime = setupTime6;

    //Backlogs
    //Capacity Planning Backlog
    let workstation6Backlog = this.queues.filter(
      (queues) => queues.workstation === 6
    );

    let capacityRequirementsBacklog6 = 0;
    let setupTimeBacklog6 = 0;
    let workstation6 = this.workstations.filter(workstation => workstation.workstation === 6);
    for (let i = 0; i < workstation6Backlog.length; i++) {
      capacityRequirementsBacklog6 += workstation6Backlog[i].time;
      if(workstation6Backlog[i].inwork === false) {
        setupTimeBacklog6 += workstation6.find(workstation => workstation.article === workstation6Backlog[i].article).setupTime;
      }
    }
    this.dataSource[4].capacityRequirementsBacklog =
      capacityRequirementsBacklog6;
    this.dataSource[4].setupTimeBacklog = setupTimeBacklog6;

    //  Workstation 7

    // Capacity Requriement
    // Alle Artikel die in der Workstation 4 hergestellt werden, sollen hier addiert werden
    let article10 = this.orders.find((orders) => orders.article === 10);
    let article11 = this.orders.find((orders) => orders.article === 11);
    let article12 = this.orders.find((orders) => orders.article === 12);

    let article13 = this.orders.find((orders) => orders.article === 13);
    let article14 = this.orders.find((orders) => orders.article === 14);
    let article15 = this.orders.find((orders) => orders.article === 15);

    // Artikel 18 19 20 schon vorher ausgelesen

    let article26 = this.orders.find((orders) => orders.article === 26);

    //Updaten der DataSource
    this.dataSource[5].capacityRequirements =
      article10.amount * 2 +
      article11.amount * 2 +
      article12.amount * 2 +
      article13.amount * 2 +
      article14.amount * 2 +
      article15.amount * 2 +
      article18.amount * 2 +
      article19.amount * 2 +
      article20.amount * 2 +
      article26.amount * 2;

    //Set Up Time
    //Deklaration
    let s10w7 = 0;
    let s11w7 = 0;
    let s12w7 = 0;
    let s13w7 = 0;
    let s14w7 = 0;
    let s15w7 = 0;
    let s18w7 = 0;
    let s19w7 = 0;
    let s20w7 = 0;
    let s26w7 = 0;

    //Prüfen ob Artikel produziert werden soll wenn ja wird die jeweilige Set Up Time gesetzt
    if (article10.amount > 0) {
      s10w7 = 20;
    }
    if (article11.amount > 0) {
      s11w7 = 20;
    }
    if (article12.amount > 0) {
      s12w7 = 20;
    }
    if (article13.amount > 0) {
      s13w7 = 20;
    }
    if (article14.amount > 0) {
      s14w7 = 20;
    }
    if (article15.amount > 0) {
      s15w7 = 20;
    }
    if (article18.amount > 0) {
      s18w7 = 20;
    }
    if (article19.amount > 0) {
      s19w7 = 20;
    }
    if (article20.amount > 0) {
      s20w7 = 20;
    }
    if (article26.amount > 0) {
      s26w7 = 20;
    }

    // Addieren der Setup Time und anschließend Data Source Updaten
    let setupTime7 = s10w7 + s11w7 + s12w7 + s13w7 + s14w7 + s15w7 + s18w7 + s19w7 + s20w7 + s26w7;
    this.dataSource[5].setupTime = setupTime7;

    //Backlogs
    //Capacity Planning Backlog
    let workstation7Backlog = this.queues.filter(
      (queues) => queues.workstation === 7
    );

    let capacityRequirementsBacklog7 = 0;
    let setupTimeBacklog7 = 0;
    let workstation7 = this.workstations.filter(workstation => workstation.workstation === 7);
    for (let i = 0; i < workstation7Backlog.length; i++) {
      capacityRequirementsBacklog7 += workstation7Backlog[i].time;
      if(workstation7Backlog[i].inwork === false) {
        setupTimeBacklog7 += workstation7.find(workstation => workstation.article === workstation7Backlog[i].article).setupTime;
      }
    }
    this.dataSource[5].capacityRequirementsBacklog =
      capacityRequirementsBacklog7;
    this.dataSource[5].setupTimeBacklog = setupTimeBacklog7;

    //  Workstation 8

    // Capacity Requriement
    // Alle Artikel die in der Workstation 4 hergestellt werden, sollen hier addiert werden

    // Artikel ... 18 19 20 schon vorher ausgelesen

    //Updaten der DataSource
    this.dataSource[6].capacityRequirements =
      article10.amount * 1 +
      article11.amount * 2 +
      article12.amount * 2 +
      article13.amount * 1 +
      article14.amount * 2 +
      article15.amount * 2 +
      article18.amount * 3 +
      article19.amount * 3 +
      article20.amount * 3;

    //Set Up Time
    //Deklaration
    let s10w8 = 0;
    let s11w8 = 0;
    let s12w8 = 0;
    let s13w8 = 0;
    let s14w8 = 0;
    let s15w8 = 0;
    let s18w8 = 0;
    let s19w8 = 0;
    let s20w8 = 0;

    //Prüfen ob Artikel produziert werden soll wenn ja wird die jeweilige Set Up Time gesetzt

    if (article10.amount > 0) {
      s10w8 = 15;
    }
    if (article11.amount > 0) {
      s11w8 = 15;
    }
    if (article12.amount > 0) {
      s12w8 = 15;
    }
    if (article13.amount > 0) {
      s13w8 = 15;
    }
    if (article14.amount > 0) {
      s14w8 = 15;
    }
    if (article15.amount > 0) {
      s15w8 = 15;
    }
    if (article18.amount > 0) {
      s18w8 = 20;
    }
    if (article19.amount > 0) {
      s19w8 = 25;
    }
    if (article20.amount > 0) {
      s20w8 = 20;
    }

    // Addieren der Setup Time und anschließend Data Source Updaten
    let setupTime8 =
      s10w8 + s11w8 + s12w8 + s13w8 + s14w8 + s15w8 + s18w8 + s19w8 + s20w8;
    this.dataSource[6].setupTime = setupTime8;

    //Backlogs
    //Capacity Planning Backlog
    let workstation8Backlog = this.queues.filter(
      (queues) => queues.workstation === 7
    );

    let capacityRequirementsBacklog8 = 0;
    let setupTimeBacklog8 = 0;
    let workstation8 = this.workstations.filter(workstation => workstation.workstation === 8);
    for (let i = 0; i < workstation8Backlog.length; i++) {
      capacityRequirementsBacklog8 += workstation8Backlog[i].time;
      if(workstation8Backlog[i].inwork === false) {
        setupTimeBacklog8 += workstation8.find(workstation => workstation.article === workstation8Backlog[i].article).setupTime;
      }
    }
    this.dataSource[6].capacityRequirementsBacklog =
      capacityRequirementsBacklog8;
    this.dataSource[6].setupTimeBacklog = setupTimeBacklog8;

    //  Workstation 9

    // Capacity Requriement
    // Alle Artikel die in der Workstation 4 hergestellt werden, sollen hier addiert werden



    //Updaten der DataSource
    this.dataSource[7].capacityRequirements =
      article10.amount * 3 +
      article11.amount * 3 +
      article12.amount * 3 +
      article13.amount * 3 +
      article14.amount * 3 +
      article15.amount * 3 +
      article18.amount * 2 +
      article19.amount * 2 +
      article20.amount * 2;

    //Set Up Time
    //Deklaration
    let s10w9 = 0;
    let s11w9 = 0;
    let s12w9 = 0;
    let s13w9 = 0;
    let s14w9 = 0;
    let s15w9 = 0;
    let s18w9 = 0;
    let s19w9 = 0;
    let s20w9 = 0;

    //Prüfen ob Artikel produziert werden soll wenn ja wird die jeweilige Set Up Time gesetzt
    if (article10.amount > 0) {
      s10w9 = 15;
    }
    if (article11.amount > 0) {
      s11w9 = 15;
    }
    if (article12.amount > 0) {
      s12w9 = 15;
    }
    if (article13.amount > 0) {
      s13w9 = 15;
    }
    if (article14.amount > 0) {
      s14w9 = 15;
    }
    if (article15.amount > 0) {
      s15w9 = 15;
    }
    if (article18.amount > 0) {
      s18w9 = 15;
    }
    if (article19.amount > 0) {
      s19w9 = 20;
    }
    if (article20.amount > 0) {
      s20w9 = 15;
    }

    // Addieren der Setup Time und anschließend Data Source Updaten
    let setupTime9 = s10w9 + s11w9 + s12w9+ s13w9 + s14w9 + s15w9 +  s18w9 + s19w9 + s20w9;
    this.dataSource[7].setupTime = setupTime9;

    //Backlogs
    //Capacity Planning Backlog
    let workstation9Backlog = this.queues.filter(
      (queues) => queues.workstation === 9
    );

    let capacityRequirementsBacklog9 = 0;
    let setupTimeBacklog9 = 0;
    let workstation9 = this.workstations.filter(workstation => workstation.workstation === 9);
    for (let i = 0; i < workstation9Backlog.length; i++) {
      capacityRequirementsBacklog9 += workstation9Backlog[i].time;
      if(workstation9Backlog[i].inwork === false) {
        setupTimeBacklog9 += workstation9.find(workstation => workstation.article === workstation9Backlog[i].article).setupTime;
      }
    }
    this.dataSource[7].capacityRequirementsBacklog =
      capacityRequirementsBacklog9;
    this.dataSource[7].setupTimeBacklog = setupTimeBacklog9;

    //  Workstation 10

    // Capacity Requriement
    // Alle Artikel die in der Workstation 4 hergestellt werden, sollen hier addiert werden

    let article4 = this.orders.find((orders) => orders.article === 4);
    let article5 = this.orders.find((orders) => orders.article === 5);
    let article6 = this.orders.find((orders) => orders.article === 6);

    let article7 = this.orders.find((orders) => orders.article === 7);
    let article8 = this.orders.find((orders) => orders.article === 8);
    let article9 = this.orders.find((orders) => orders.article === 9);

    //Updaten der DataSource
    this.dataSource[8].capacityRequirements =
      article4.amount * 4 +
      article5.amount * 4 +
      article6.amount * 4 +
      article7.amount * 4 +
      article8.amount * 4 +
      article9.amount * 4;

    //Set Up Time
    //Deklaration
    let s4 = 0;
    let s5 = 0;
    let s6 = 0;

    let s7 = 0;
    let s8 = 0;
    let s9 = 0;

    //Prüfen ob Artikel produziert werden soll wenn ja wird die jeweilige Set Up Time gesetzt

    if (article4.amount > 0) {
      s4 = 20;
    }
    if (article5.amount > 0) {
      s5 = 20;
    }
    if (article6.amount > 0) {
      s6 = 20;
    }

    if (article7.amount > 0) {
      s7 = 20;
    }
    if (article8.amount > 0) {
      s8 = 20;
    }
    if (article9.amount > 0) {
      s9 = 20;
    }

    // Addieren der Setup Time und anschließend Data Source Updaten
    let setupTime10 = s4 + s5 + s6 + s7 + s8 + s9;
    this.dataSource[8].setupTime = setupTime10;

    //Backlogs
    //Capacity Planning Backlog
    let workstation10Backlog = this.queues.filter(
      (queues) => queues.workstation === 10
    );

    let capacityRequirementsBacklog10 = 0;
    let setupTimeBacklog10 = 0;
    let workstation10 = this.workstations.filter(workstation => workstation.workstation === 10);
    for (let i = 0; i < workstation10Backlog.length; i++) {
      capacityRequirementsBacklog10 += workstation10Backlog[i].time;
      if(workstation10Backlog[i].inwork === false) {
        setupTimeBacklog10 += workstation10.find(workstation => workstation.article === workstation10Backlog[i].article).setupTime;
      }
    }
    this.dataSource[8].capacityRequirementsBacklog =
      capacityRequirementsBacklog10;
    this.dataSource[8].setupTimeBacklog = setupTimeBacklog10;

    //  Workstation 11

    // Capacity Requriement
    // Alle Artikel die in der Workstation 4 hergestellt werden, sollen hier addiert werden

    //Updaten der DataSource
    this.dataSource[9].capacityRequirements =
      article4.amount * 3 +
      article5.amount * 3 +
      article6.amount * 3 +
      article7.amount * 3 +
      article8.amount * 3 +
      article9.amount * 3;

    //Set Up Time
    //Deklaration
    let s4w11 = 0;
    let s5w11 = 0;
    let s6w11 = 0;
    let s7w11 = 0;
    let s8w11 = 0;
    let s9w11 = 0;

    //Prüfen ob Artikel produziert werden soll wenn ja wird die jeweilige Set Up Time gesetzt

    if (article4.amount > 0) {
      s4w11 = 10;
    }
    if (article5.amount > 0) {
      s5w11 = 10;
    }
    if (article6.amount > 0) {
      s4w11 = 20;
    }
    if (article7.amount > 0) {
      s7w11 = 20;
    }
    if (article8.amount > 0) {
      s8w11 = 20;
    }
    if (article9.amount > 0) {
      s9w11 = 20;
    }


    // Addieren der Setup Time und anschließend Data Source Updaten
    let setupTime11 = s4w11 + s5w11 + s6w11 + s7w11 + s8w11 + s9w11;
    this.dataSource[9].setupTime = setupTime11;

    //Backlogs
    //Capacity Planning Backlog
    let workstation11Backlog = this.queues.filter(
      (queues) => queues.workstation === 11
    );

    let capacityRequirementsBacklog11 = 0;
    let setupTimeBacklog11 = 0;
    let workstation11 = this.workstations.filter(workstation => workstation.workstation === 11);
    for (let i = 0; i < workstation11Backlog.length; i++) {
      capacityRequirementsBacklog11 += workstation11Backlog[i].time;
      if(workstation11Backlog[i].inwork === false) {
        setupTimeBacklog11 += workstation11.find(workstation => workstation.article === workstation11Backlog[i].article).setupTime;
      }
    }
    this.dataSource[9].capacityRequirementsBacklog =
      capacityRequirementsBacklog11;
    this.dataSource[9].setupTimeBacklog = setupTimeBacklog11;

    //  Workstation 12

    // Capacity Requriement
    // Alle Artikel die in der Workstation 4 hergestellt werden, sollen hier addiert werden

    //schon Vorhanden

    //Updaten der DataSource
    this.dataSource[10].capacityRequirements =
      article10.amount * 3 +
      article11.amount * 3 +
      article12.amount * 3 +
      article13.amount * 3 +
      article14.amount * 3 +
      article15.amount * 3;

    //Set Up Time
    //keine Rüstzeit für Arbeitsplatz 12

    //Backlogs
    //Capacity Planning Backlog
    let workstation12Backlog = this.queues.filter(
      (queues) => queues.workstation === 12
    );

    let capacityRequirementsBacklog12 = 0;
    let setupTimeBacklog12 = 0;
    let workstation12 = this.workstations.filter(workstation => workstation.workstation === 12);
    for (let i = 0; i < workstation12Backlog.length; i++) {
      capacityRequirementsBacklog12 += workstation12Backlog[i].time;
      if(workstation12Backlog[i].inwork === false) {
        setupTimeBacklog12 += workstation12.find(workstation => workstation.article === workstation12Backlog[i].article).setupTime;
      }
    }
    this.dataSource[10].capacityRequirementsBacklog =
      capacityRequirementsBacklog12;
    this.dataSource[10].setupTimeBacklog = setupTimeBacklog12;

    //  Workstation 13

    // Capacity Requriement
    // Alle Artikel die in der Workstation 4 hergestellt werden, sollen hier addiert werden

    //schon Vorhanden

    //Updaten der DataSource
    this.dataSource[11].capacityRequirements =
      article10.amount * 2 +
      article11.amount * 2 +
      article12.amount * 2 +
      article13.amount * 2 +
      article14.amount * 2 +
      article15.amount * 2;

    //Set Up Time
    //keine Rüstzeit für Arbeitsplatz 13

    //Backlogs
    //Capacity Planning Backlog
    let workstation13Backlog = this.queues.filter(
      (queues) => queues.workstation === 13
    );

    let capacityRequirementsBacklog13 = 0;
    let setupTimeBacklog13 = 0;
    let workstation13 = this.workstations.filter(workstation => workstation.workstation === 13);
    for (let i = 0; i < workstation13Backlog.length; i++) {
      capacityRequirementsBacklog13 += workstation13Backlog[i].time;
      if(workstation13Backlog[i].inwork === false) {
        setupTimeBacklog13 += workstation13.find(workstation => workstation.article === workstation13Backlog[i].article).setupTime;
      }
    }
    this.dataSource[11].capacityRequirementsBacklog =
      capacityRequirementsBacklog13;
    this.dataSource[11].setupTimeBacklog = setupTimeBacklog13;

    //  Workstation 14

    // Capacity Requriement
    // Alle Artikel die in der Workstation 4 hergestellt werden, sollen hier addiert werden

    //schon Vorhanden

    //Updaten der DataSource
    this.dataSource[12].capacityRequirements = article16.amount * 3;

    //Set Up Time
    //keine Rüstzeit für Arbeitsplatz 13

    //Backlogs
    //Capacity Planning Backlog
    let workstation14Backlog = this.queues.filter(
      (queues) => queues.workstation === 14
    );

    let capacityRequirementsBacklog14 = 0;
    let setupTimeBacklog14 = 0;
    let workstation14 = this.workstations.filter(workstation => workstation.workstation === 14);
    for (let i = 0; i < workstation14Backlog.length; i++) {
      capacityRequirementsBacklog14 += workstation14Backlog[i].time;
      if(workstation14Backlog[i].inwork === false) {
        setupTimeBacklog14 += workstation14.find(workstation => workstation.article === workstation14Backlog[i].article).setupTime;
      }
    }
    this.dataSource[12].capacityRequirementsBacklog =
      capacityRequirementsBacklog14;
    this.dataSource[12].setupTimeBacklog = setupTimeBacklog14;

    //  Workstation 15

    // Capacity Requriement

    let article17 = this.orders.find((orders) => orders.article === 17);

    //Updaten der DataSource
    this.dataSource[13].capacityRequirements =
      article17.amount * 3 + article26.amount * 3;

    //Set Up Time
    //Deklaration
    let s17w15 = 0;
    let s26w15 = 0;

    //Prüfen ob Artikel produziert werden soll wenn ja wird die jeweilige Set Up Time gesetzt

    if (article17.amount > 0) {
      s17w15 = 15;
    }
    if (article26.amount > 0) {
      s26w15 = 15;
    }

    // Addieren der Setup Time und anschließend Data Source Updaten
    let setupTime15 = s26w15 + s17w15;
    this.dataSource[13].setupTime = setupTime15;

    //Backlogs
    //Capacity Planning Backlog
    let workstation15Backlog = this.queues.filter(
      (queues) => queues.workstation === 15
    );

    let capacityRequirementsBacklog15 = 0;
    let setupTimeBacklog15 = 0;
    let workstation15 = this.workstations.filter(workstation => workstation.workstation === 15);
    for (let i = 0; i < workstation15Backlog.length; i++) {
      capacityRequirementsBacklog15 += workstation15Backlog[i].time;
      if(workstation15Backlog[i].inwork === false) {
        setupTimeBacklog15 += workstation15.find(workstation => workstation.article === workstation15Backlog[i].article).setupTime;
      }
    }
    this.dataSource[13].capacityRequirementsBacklog =
      capacityRequirementsBacklog15;
    this.dataSource[13].setupTimeBacklog = setupTimeBacklog15;

    // //queue auslesen für offene Rüstzeit und kapazität
    // let queuesElement = this.queues.filter(
    //   (queues) => queues.workstation === 1
    // );
    // let capacityBacklog1 = 0;

    // for (let i = 0; i < queuesElement.length; i++) {
    //   capacityBacklog1 += queuesElement[i].amount;
    // }

    // let setupTimeBacklog1 = 0;

    // for (let i = 0; i < queuesElement.length; i++) {
    //   setupTimeBacklog1 += queuesElement[i].time;
    // }

    // this.dataSource[0].capacityRequirementsBacklog = capacityBacklog1;
    // this.dataSource[0].setupTimeBacklog = setupTimeBacklog1;

    //Schliefe zum Addieren der Gesamtzeit Capacity Requriement
    for (let x = 0; x < 14; x++) {
      this.dataSource[x].totalCapacityRequirements =
        this.dataSource[x].capacityRequirements +
        this.dataSource[x].capacityRequirementsBacklog +
        this.dataSource[x].setupTimeBacklog +
        this.dataSource[x].setupTime;
    }

    // Berechnung der Schichten und Überstunden

    for (let x = 0; x < 14; x++) {

      this.dataSource[x].shift = 1;

      if (
        this.dataSource[x].totalCapacityRequirements <= 3600 &&
        this.dataSource[x].totalCapacityRequirements > 2400
      ) {
        this.dataSource[x].overtime = 
        Math.ceil((this.dataSource[x].totalCapacityRequirements - 2400) / 5);
      }
      if (
        this.dataSource[x].totalCapacityRequirements <= 4800 &&
        this.dataSource[x].totalCapacityRequirements > 3600
      ) {
        this.dataSource[x].shift = 2;
      }
      if (
        this.dataSource[x].totalCapacityRequirements <= 6000 &&
        this.dataSource[x].totalCapacityRequirements > 4800
      ) {
        this.dataSource[x].overtime =
        Math.ceil((this.dataSource[x].totalCapacityRequirements - 4800) / 5);
      }
      if (this.dataSource[x].totalCapacityRequirements > 6000) {
        this.dataSource[x].shift = 3;
      }

      ProcessNavbarComponent.materialPlanning = !this.dataSource.find(data => data.totalCapacityRequirements > 7200);
    }
  }
}
