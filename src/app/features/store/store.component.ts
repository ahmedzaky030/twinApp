
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

//import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StoreApiService, OrderApi } from '../../api/services';
import * as _ from 'lodash';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  stores = [];
  StoreSub: Subscription;
  orders = [];
  OrderSub : Subscription;
  orderData:any;
  constructor(private storeApi:StoreApiService , private orderApi:OrderApi) { }

  ngOnInit() {
    this.getStoresList();
    this.getOrderFinishedList();
    
  }

  getStoresList(){
    this.StoreSub = this.storeApi.getStoreList().subscribe(data => {
      this.stores = data;
    })
  }

  getOrderFinishedList(){
    this.OrderSub = this.orderApi.getOrderFinishedList().subscribe(data => {
      this.orders = data;
      var operations = _.groupBy(this.orders , 'orderType.operationName')
      var prices = _.mapValues(operations ,  (r)=>   r[0].orderType.price);
      var counts = _.mapValues(operations ,  (r)=>   r.length);
      
      var concatenated = _.mergeWith(prices , counts , (objVal , srcVal)=>{ return _.concat(srcVal , objVal)});
      var keys = _.keys(concatenated);
      var values = _.values(concatenated);
      var totalData = _.mergeWith(keys , values , (objVal , srcVal)=>{ return _.concat(srcVal , objVal)})
      this.orderData = totalData;
    })
  }

}
