import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { FeaturesModule  } from '../features/features.module';
import { LayoutRoutingMd } from './layout.routing';


@NgModule({
  imports: [
    CommonModule,
    FeaturesModule,
    LayoutRoutingMd
  ],
  declarations: [LayoutComponent],
  exports:[LayoutComponent]
})
export class LayoutModule { }
