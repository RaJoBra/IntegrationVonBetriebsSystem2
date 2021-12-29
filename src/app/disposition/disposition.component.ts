import { Component, OnInit } from '@angular/core';
import { ProcessNavbarComponent } from '../process-navbar/process-navbar.component';

@Component({
  selector: 'app-disposition',
  templateUrl: './disposition.component.html',
  styleUrls: ['./disposition.component.css']
})
export class DispositionComponent implements OnInit {

  constructor() {
    ProcessNavbarComponent.manufacturingSequence = true;
  }

  ngOnInit(): void {}
}
