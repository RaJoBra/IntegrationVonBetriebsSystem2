import { Component, OnInit } from '@angular/core';
import { ProcessNavbarComponent } from '../process-navbar/process-navbar.component';

@Component({
  selector: 'app-production-program',
  templateUrl: './production-program.component.html',
  styleUrls: ['./production-program.component.css']
})
export class ProductionProgramComponent implements OnInit {

  constructor() {
    ProcessNavbarComponent.disposition = true;
  }

  ngOnInit(): void {}
}
