import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicComponent } from './clinic/clinic.component';
import { StudentComponent } from './student/student.component';
import { ItemComponent } from './item/item.component';
import { OrderComponent } from './order/order.component';
import { ExtOrderComponent } from './ext-order/ext-order.component';
import { TechnicianComponent } from './technician/technician.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OperationComponent } from './operation/operation.component';
import { StoreComponent } from './store/store.component';

@NgModule({
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ClinicComponent, StudentComponent, ItemComponent, OrderComponent, ExtOrderComponent, TechnicianComponent, DashboardComponent, OperationComponent, StoreComponent],
  exports:[ClinicComponent, StudentComponent, ItemComponent, OrderComponent, ExtOrderComponent, TechnicianComponent , DashboardComponent, OperationComponent , StoreComponent],
})
export class FeaturesModule { }
