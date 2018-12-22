import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';

import { AlertModule  , ModalModule} from 'ngx-bootstrap';
import { LayoutModule } from './layout/layout.module';
import { FeaturesModule } from './features/features.module';
import { SharedModule } from './shared/shared.module'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClinicApi, StudentApi,  OrderApi, ExtOrderApi, ItemApi , TechnicianApi , OperationApi , StoreApiService} from './api/services';
import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    MatDialogModule,
    FeaturesModule,
    LayoutModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpModule
  ],
  providers: [ClinicApi , StudentApi ,  OrderApi , ExtOrderApi , ItemApi , TechnicianApi , OperationApi , StoreApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
