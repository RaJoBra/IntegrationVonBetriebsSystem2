import { NgModule } from '@angular/core';
import { DispositionP1Component } from './disposition-p1/disposition-p1.component';
import { DispositionP1Module } from './disposition-p1/disposition-p1.module';
import { DispositionP2Component } from './disposition-p2/disposition-p2.component';
import { DispositionP2Module } from './disposition-p2/disposition-p2.module';
import { DispositionP3Component } from './disposition-p3/disposition-p3.component';
import { DispositionP3Module } from './disposition-p3/disposition-p3.module';
import { MultipleUsePartsComponent } from './multiple-use-parts/multiple-use-parts.component';
import { MultipleUsePartsModule } from './multiple-use-parts/multiple-use-parts.module';
@NgModule({
    declarations: [DispositionModule, DispositionP1Component, DispositionP2Component, DispositionP3Component, MultipleUsePartsComponent],
    exports: [DispositionModule],
    imports: [
        DispositionP1Module,
        DispositionP2Module,
        DispositionP3Module,
        MultipleUsePartsModule,
    ],
})
export class DispositionModule {}
