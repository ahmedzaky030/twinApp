import {Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { apiUrl } from './apiUrl.config';
import "rxjs/add/operator/map";

@Injectable()
export class OrderApi {
    constructor(private http: Http){}

    searchOrderUrl  = apiUrl.orderUrlWithSearch;
    orderWithIdUrl = apiUrl.orderUrlWithId;
    orderUrl = apiUrl.orderUrl;
    orderFinishedUrl = apiUrl.orderFinishedUrl;
    orderTypeUrl = apiUrl.orderUrlwithType;
    
    getOrderList(search?: string , id?:string , type?:string): Observable<any>{
        debugger;
        let url = search ? this.searchOrderUrl.replace("{0}", search) : this.orderTypeUrl;
        url = type ? url.replace("{0}", id).replace("{1}", type) : this.orderUrl;
        console.log('new  order url', url);
        return  this.http.get(url).map(res => res.json());
    }

    getOrderFinishedList(){
        let url = this.orderFinishedUrl;
        return this.http.get(url).map(res => res.json())
      }

    createOrder(orderObj: any){
        let headers = new Headers();
        headers.set("Content-Type","application/json");
        headers.set("Accept", "*/*");
        return this.http.post(apiUrl.orderUrl, orderObj , {headers:headers  })
    }

    deleteOrder(id:string){
        console.log('id',id);
        return this.http.delete(apiUrl.orderUrlWithId.replace("{0}", id))
    }

    modifyOrder(id:string, orderObj:any){
        console.log('id',id);
        
        let headers = new Headers();
        headers.set("Content-Type","application/json");
        headers.set("Accept", "*/*");
        return this.http.put(apiUrl.orderUrlWithId.replace("{0}", id) , orderObj, {headers: headers} )
    }

   
}

