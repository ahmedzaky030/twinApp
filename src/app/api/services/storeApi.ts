import {Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { apiUrl } from './apiUrl.config';
import "rxjs/add/operator/map";

@Injectable({
  providedIn: 'root'
})
export class StoreApiService {
  constructor(private http: Http){}

  storeUrl = apiUrl.storeUrl;
  
  getStoreList(): Observable<any>{
      let url = this.storeUrl;
      return  this.http.get(url).map(res => res.json())
  }

  
}
