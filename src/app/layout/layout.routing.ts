import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { StudentComponent } from '../features/student/student.component';
import { OrderComponent } from '../features/order/order.component';
import { ClinicComponent } from '../features/clinic/clinic.component';
import { ExtOrderComponent } from '../features/ext-order/ext-order.component';
import { ItemComponent } from '../features/item/item.component';
import { TechnicianComponent } from '../features/technician/technician.component';
import { DashboardComponent } from '../features/dashboard/dashboard.component';
import { OperationComponent } from '../features/operation/operation.component';
import { StoreComponent } from '../features/store/store.component';

const routes : Routes  = [
    { path: 'main' , component:DashboardComponent   },
    { path:'student', component:StudentComponent },
    { path:'order/:id/:type', component: OrderComponent },
    { path:'clinic', component: ClinicComponent },
    { path: 'extOrder' , component:ExtOrderComponent },
    { path: 'item' , component: ItemComponent },
    { path:'techn', component: TechnicianComponent },
    { path:'operation', component: OperationComponent },
    { path:'store', component: StoreComponent },
    { path:'', pathMatch:'full', redirectTo:'main'}
]

export const LayoutRoutingMd = RouterModule.forRoot(routes);