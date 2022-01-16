import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ProductionProgramComponent } from './production-program/production-program.component';
import { DispositionComponent } from './disposition/disposition.component';
import { ProductionProgramPeriodNComponent } from './production-program/production-program-period-n/production-program-period-n.component';
import { ProductionProgramPeriodN1Component } from './production-program/production-program-period-n+1/production-program-period-n1.component';
import { ManufacturingSequenceComponent } from './manufacturing-sequence/manufacturing-sequence.component';
import { ProductionProgramPeriodN2Component } from './production-program/production-program-period-n+2/production-program-period-n2.component';
import { ProductionProgramPeriodN3Component } from './production-program/production-program-period-n+3/production-program-period-n3.component';
import { DirectSalesComponent } from './production-program/direct-sales/direct-sales.component';
import { IndexComponent } from './index/index.component';
import { CapacityPlanningComponent } from './capacity-planning/capacity-planning.component';
import { MaterialPlanningComponent } from './material-planning/material-planning.component';
import { DispositionP1Component } from './disposition/disposition-p1/disposition-p1.component';
import { DispositionP2Component } from './disposition/disposition-p2/disposition-p2.component';
import { DispositionP3Component } from './disposition/disposition-p3/disposition-p3.component';
import { FileDownloadComponent } from './file-download/file-download.component';
import { MultipleUsePartsComponent } from './disposition/multiple-use-parts/multiple-use-parts.component';
import { CoreDataComponent } from './core-data/core-data.component'
import { TutorialComponent } from './tutorial/tutorial.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManualComponent } from './manual/manual.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '',   redirectTo: '/index', pathMatch: 'full' },
  { path: 'production-program', component: ProductionProgramComponent },
  { path: 'production-program-period-n', component: ProductionProgramPeriodNComponent},
  { path: 'production-program-period-n1', component: ProductionProgramPeriodN1Component},
  { path: 'production-program-period-n2', component: ProductionProgramPeriodN2Component},
  { path: 'production-program-period-n3', component: ProductionProgramPeriodN3Component},
  { path: 'direct-sales', component: DirectSalesComponent},
  { path: 'file-upload', component: FileUploadComponent },
  { path: 'disposition', component: DispositionComponent },
  { path: 'disposition-p1', component: DispositionP1Component },
  { path: 'disposition-p2', component: DispositionP2Component },
  { path: 'disposition-p3', component: DispositionP3Component },
  { path: 'multiple-use-parts', component: MultipleUsePartsComponent },
  { path: 'manufacturing-sequence', component: ManufacturingSequenceComponent },
  { path: 'index', component: IndexComponent },
  { path: 'capacity-planning', component: CapacityPlanningComponent },
  { path: 'material-planning', component: MaterialPlanningComponent },
  { path: 'file-download', component: FileDownloadComponent },
  { path: 'core-data', component: CoreDataComponent },
  { path: 'tutorial', component: TutorialComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'manual', component: ManualComponent },
  { path: 'result', component: ResultComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
