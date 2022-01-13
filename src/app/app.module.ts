import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CapacityPlanningComponent } from './capacity-planning/capacity-planning.component';
import { DesignComponent } from './design/design.component';
import { DirectSalesComponent } from './production-program/direct-sales/direct-sales.component';
import { DispositionComponent } from './disposition/disposition.component';
import { DispositionP1Component } from './disposition/disposition-p1/disposition-p1.component';
import { DispositionP2Component } from './disposition/disposition-p2/disposition-p2.component';
import { DispositionP3Component } from './disposition/disposition-p3/disposition-p3.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FileDownloadComponent } from './file-download/file-download.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './database/in-memory-data.service';
import { IndexComponent } from './index/index.component';
import { ManufacturingSequenceComponent } from './manufacturing-sequence/manufacturing-sequence.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MaterialPlanningComponent } from './material-planning/material-planning.component';
import { MultipleUsePartsComponent } from './disposition/multiple-use-parts/multiple-use-parts.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, LOCALE_ID } from '@angular/core';
import { ProductionProgramComponent } from './production-program/production-program.component';
import { ProductionProgramPeriodN1Component } from './production-program/production-program-period-n+1/production-program-period-n1.component';
import { ProductionProgramPeriodN2Component } from './production-program/production-program-period-n+2/production-program-period-n2.component';
import { ProductionProgramPeriodN3Component } from './production-program/production-program-period-n+3/production-program-period-n3.component';
import { ProductionProgramPeriodNComponent } from './production-program/production-program-period-n/production-program-period-n.component';
import { SplitDialogComponent } from './split-dialog/split-dialog.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialPlanningTableComponent } from './material-planning/material-planning-table/material-planning-table.component';
import { TableExpandableRowsExampleComponent } from './material-planning/table-expandable-rows-example/table-expandable-rows-example.component';
import { CoreDataComponent } from './core-data/core-data.component';
import { ProcessNavbarComponent } from './process-navbar/process-navbar.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/de';
import { DynamicDataComponent } from './dynamic-data/dynamic-data.component';
registerLocaleData(localeFr, 'de');
import { NavbarDialogComponent } from './navbar-dialog/navbar-dialog.component';
import { ManualComponent } from './manual/manual.component';
import { FileUploadDialogTypesComponent } from './file-upload-dialog-types/file-upload-dialog-types.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductionProgramComponent,
    FileUploadComponent,
    DispositionComponent,
    ManufacturingSequenceComponent,
    DesignComponent,
    ProductionProgramPeriodNComponent,
    ProductionProgramPeriodN1Component,
    ProductionProgramPeriodN2Component,
    ProductionProgramPeriodN3Component,
    DirectSalesComponent,
    MaterialPlanningComponent,
    DispositionP1Component,
    DispositionP2Component,
    DispositionP3Component,
    FileDownloadComponent,
    CapacityPlanningComponent,
    MultipleUsePartsComponent,
    IndexComponent,
    SplitDialogComponent,
    FileUploadDialogComponent,
    FileUploadDialogComponent,
    MaterialPlanningTableComponent,
    TableExpandableRowsExampleComponent,
    CoreDataComponent,
    ProcessNavbarComponent,
    TutorialComponent,
    DashboardComponent,
    DynamicDataComponent,
    NavbarDialogComponent,
    ManualComponent,
    FileUploadDialogTypesComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatSnackBarModule,
    MatStepperModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MatTabsModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatDividerModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true,
    }),
    MatMenuModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    MatSelectModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'de' // 'de' for Germany, 'fr' for France ...
   }],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
