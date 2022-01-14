import { NgModule } from '@angular/core';
import { ProductionProgramPeriodN1 } from './production-program-period-n+1/production-program-period-n1.module';
import { ProductionProgramPeriodN } from './production-program-period-n/production-program-period-n.module';
import { ProductionProgramPeriodN2Component } from './production-program-period-n+2/production-program-period-n2.component';
import { ProductionProgramPeriodN2 } from './production-program-period-n+2/production-program-period-n2.module';
import { ProductionProgramPeriodN3Component } from './production-program-period-n+3/production-program-period-n3.component';
import { ProductionProgramPeriodN3 } from './production-program-period-n+3/production-program-period-n3.module';
import { DirectSalesComponent } from './direct-sales/direct-sales.component';
import { DirectSalesModule } from './direct-sales/direct-sales.module';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';

@NgModule({
    declarations: [ProductionProgramModule, ProductionProgramPeriodN2Component, ProductionProgramPeriodN2Component, ProductionProgramPeriodN3Component, DirectSalesComponent],
    exports: [ProductionProgramModule],
    imports: [
        ProductionProgramPeriodN,
        ProductionProgramPeriodN1,
        ProductionProgramPeriodN2,
        ProductionProgramPeriodN3,
        DirectSalesModule,
    ],
})
export class ProductionProgramModule {}
