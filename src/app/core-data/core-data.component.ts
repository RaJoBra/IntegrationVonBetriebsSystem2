import { Component, OnInit } from '@angular/core';

interface ListArticle {
  articleId;
  amountForArticle1;
  amountForArticle2;
  amountForArticle3;
}

////#region
const PRODUCED_PARTS_TABLE_DATA: ListArticle[] = [
  {articleId: 'E4', amountForArticle1: 1, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'E5', amountForArticle1: 0, amountForArticle2: 1, amountForArticle3: 0},
  {articleId: 'E6', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 1},
  {articleId: 'E7', amountForArticle1: 1, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'E8', amountForArticle1: 0, amountForArticle2: 1, amountForArticle3: 0},
  {articleId: 'E9', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 1},
  {articleId: 'E10', amountForArticle1: 1, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'E11', amountForArticle1: 0, amountForArticle2: 1, amountForArticle3: 0},
  {articleId: 'E12', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 1},
  {articleId: 'E13', amountForArticle1: 1, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'E14', amountForArticle1: 0, amountForArticle2: 1, amountForArticle3: 0},
  {articleId: 'E15', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 1},
  {articleId: 'E16', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'E17', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'E18', amountForArticle1: 1, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'E19', amountForArticle1: 0, amountForArticle2: 1, amountForArticle3: 0},
  {articleId: 'E20', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 1},
  {articleId: 'E26', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'E29', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 1},
  {articleId: 'E30', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 1},
  {articleId: 'E31', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 1},
  {articleId: 'E49', amountForArticle1: 1, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'E50', amountForArticle1: 1, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'E51', amountForArticle1: 1, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'E54', amountForArticle1: 0, amountForArticle2: 1, amountForArticle3: 0},
  {articleId: 'E55', amountForArticle1: 0, amountForArticle2: 1, amountForArticle3: 0},
  {articleId: 'E56', amountForArticle1: 0, amountForArticle2: 1, amountForArticle3: 0},
];
////#endregion

////#region
const PURCHASED_PARTS_TABLE_DATA: ListArticle[] = [
  {articleId: 'K21', amountForArticle1: 1, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'K22', amountForArticle1: 0, amountForArticle2: 1, amountForArticle3: 0},
  {articleId: 'K23', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 1},
  {articleId: 'K24', amountForArticle1: 7, amountForArticle2: 7, amountForArticle3: 7},
  {articleId: 'K25', amountForArticle1: 4, amountForArticle2: 4, amountForArticle3: 4},
  {articleId: 'K27', amountForArticle1: 2, amountForArticle2: 2, amountForArticle3: 2},
  {articleId: 'K28', amountForArticle1: 4, amountForArticle2: 5, amountForArticle3: 6},
  {articleId: 'K32', amountForArticle1: 3, amountForArticle2: 3, amountForArticle3: 3},
  {articleId: 'K33', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 2},
  {articleId: 'K34', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 72},
  {articleId: 'K35', amountForArticle1: 4, amountForArticle2: 4, amountForArticle3: 4},
  {articleId: 'K36', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'K37', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'K38', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'K39', amountForArticle1: 2, amountForArticle2: 2, amountForArticle3: 2},
  {articleId: 'K40', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'K41', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'K42', amountForArticle1: 2, amountForArticle2: 2, amountForArticle3: 2},
  {articleId: 'K43', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'K44', amountForArticle1: 3, amountForArticle2: 3, amountForArticle3: 3},
  {articleId: 'K45', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'K46', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'K47', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'K48', amountForArticle1: 2, amountForArticle2: 2, amountForArticle3: 2},
  {articleId: 'K52', amountForArticle1: 2, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'K53', amountForArticle1: 72, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'K57', amountForArticle1: 0, amountForArticle2: 2, amountForArticle3: 0},
  {articleId: 'K58', amountForArticle1: 0, amountForArticle2: 72, amountForArticle3: 0},
  {articleId: 'K59', amountForArticle1: 2, amountForArticle2: 2, amountForArticle3: 2},
];
////#endregion

////#region
const ALL_PARTS_TABLE_DATA: ListArticle[] = [
  {articleId: 'E4', amountForArticle1: 1, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'E5', amountForArticle1: 0, amountForArticle2: 1, amountForArticle3: 0},
  {articleId: 'E6', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 1},
  {articleId: 'E7', amountForArticle1: 1, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'E8', amountForArticle1: 0, amountForArticle2: 1, amountForArticle3: 0},
  {articleId: 'E9', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 1},
  {articleId: 'E10', amountForArticle1: 1, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'E11', amountForArticle1: 0, amountForArticle2: 1, amountForArticle3: 0},
  {articleId: 'E12', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 1},
  {articleId: 'E13', amountForArticle1: 1, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'E14', amountForArticle1: 0, amountForArticle2: 1, amountForArticle3: 0},
  {articleId: 'E15', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 1},
  {articleId: 'E16', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'E17', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'E18', amountForArticle1: 1, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'E19', amountForArticle1: 0, amountForArticle2: 1, amountForArticle3: 0},
  {articleId: 'E20', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 1},
  {articleId: 'K21', amountForArticle1: 1, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'K22', amountForArticle1: 0, amountForArticle2: 1, amountForArticle3: 0},
  {articleId: 'K23', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 1},
  {articleId: 'K24', amountForArticle1: 7, amountForArticle2: 7, amountForArticle3: 7},
  {articleId: 'K25', amountForArticle1: 4, amountForArticle2: 4, amountForArticle3: 4},
  {articleId: 'E26', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'K27', amountForArticle1: 2, amountForArticle2: 2, amountForArticle3: 2},
  {articleId: 'K28', amountForArticle1: 4, amountForArticle2: 5, amountForArticle3: 6},
  {articleId: 'E29', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 1},
  {articleId: 'E30', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 1},
  {articleId: 'E31', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 1},
  {articleId: 'E49', amountForArticle1: 1, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'K32', amountForArticle1: 3, amountForArticle2: 3, amountForArticle3: 3},
  {articleId: 'K33', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 2},
  {articleId: 'K34', amountForArticle1: 0, amountForArticle2: 0, amountForArticle3: 72},
  {articleId: 'K35', amountForArticle1: 4, amountForArticle2: 4, amountForArticle3: 4},
  {articleId: 'K36', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'K37', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'K38', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'K39', amountForArticle1: 2, amountForArticle2: 2, amountForArticle3: 2},
  {articleId: 'K40', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'K41', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'K42', amountForArticle1: 2, amountForArticle2: 2, amountForArticle3: 2},
  {articleId: 'K43', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'K44', amountForArticle1: 3, amountForArticle2: 3, amountForArticle3: 3},
  {articleId: 'K45', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'K46', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'K47', amountForArticle1: 1, amountForArticle2: 1, amountForArticle3: 1},
  {articleId: 'K48', amountForArticle1: 2, amountForArticle2: 2, amountForArticle3: 2},
  {articleId: 'E50', amountForArticle1: 1, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'E51', amountForArticle1: 1, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'K52', amountForArticle1: 2, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'K53', amountForArticle1: 72, amountForArticle2: 0, amountForArticle3: 0},
  {articleId: 'E54', amountForArticle1: 0, amountForArticle2: 1, amountForArticle3: 0},
  {articleId: 'E55', amountForArticle1: 0, amountForArticle2: 1, amountForArticle3: 0},
  {articleId: 'E56', amountForArticle1: 0, amountForArticle2: 1, amountForArticle3: 0},
  {articleId: 'K57', amountForArticle1: 0, amountForArticle2: 2, amountForArticle3: 0},
  {articleId: 'K58', amountForArticle1: 0, amountForArticle2: 72, amountForArticle3: 0},
  {articleId: 'K59', amountForArticle1: 2, amountForArticle2: 2, amountForArticle3: 2},
];
////#endregion

@Component({
  selector: 'app-core-data',
  templateUrl: './core-data.component.html',
  styleUrls: ['./core-data.component.css', '../app.component.css']
})
export class CoreDataComponent implements OnInit {

  constructor() { }
  displayedColumns: string[] = ["articleId", "p1", "p2", "p3"];
  dataSourceTab1 = ALL_PARTS_TABLE_DATA;
  dataSourceTab2 = PRODUCED_PARTS_TABLE_DATA;
  dataSourceTab3 = PURCHASED_PARTS_TABLE_DATA;

  ngOnInit(): void {
  }

}
