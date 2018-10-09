import { Injectable } from '@angular/core';
import { apiUrl } from './apiUrl.config';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class OperationApi {
  constructor(private http: Http){}
  searchOperationUrl  = apiUrl.operationUrlWithSearch;
  operationWithIdUrl = apiUrl.operationUrlWithId;
  operationUrl = apiUrl.operationUrl;
  getOperationList(search?: string): Observable<any>{
      let url = search ? this.searchOperationUrl.replace("{0}", search) : this.operationUrl;
     return  this.http.get(url).map(res => res.json())
  }

  createOperation(operationObj: any){
      let headers = new Headers();
      headers.set("Content-Type","application/json");
      headers.set("Accept", "*/*");
      return this.http.post(apiUrl.operationUrl, operationObj ,{headers : headers})
  }

  deleteOperation(id:string){
      console.log('id',id);
      return this.http.delete(apiUrl.operationUrlWithId.replace("{0}", id))
  }

  modifyOperation(id:string, operationObj:any){
      console.log('id',id);
      
      let header = new Headers();
      header.set("Content-Type","application/json");
      header.set("Accept", "*/*");
      return this.http.put(apiUrl.operationUrlWithId.replace("{0}", id) , operationObj, {headers: header} )
  }
}
