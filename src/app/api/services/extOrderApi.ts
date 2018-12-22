import {Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { apiUrl } from './apiUrl.config';
import "rxjs/add/operator/map";

@Injectable()
export class ExtOrderApi {
    constructor(private http: Http){}

    searchExtOrderUrl  = apiUrl.extOrderUrlWithSearch;
    extOrderWithIdUrl = apiUrl.extOrderUrlWithId;
    extOrderUrl = apiUrl.extOrderUrl;
    
    getExtOrderList(search?: string): Observable<any>{
        let url = search ? this.searchExtOrderUrl.replace("{0}", search) : this.extOrderUrl;
        return  this.http.get(url).map(res => res.json())
    }

    createExtOrder(extOrderObj: any){
        let headers = new Headers();
        headers.set("Content-Type","application/json");
        headers.set("Accept", "*/*");
        return this.http.post(apiUrl.extOrderUrl, extOrderObj , {headers:headers  })
    }

    deleteExtOrder(id:string){
        
        return this.http.delete(apiUrl.extOrderUrlWithId.replace("{0}", id))
    }

    modifyExtOrder(id:string, extOrderObj:any){
        let headers = new Headers();
        headers.set("Content-Type","application/json");
        headers.set("Accept", "*/*");
        return this.http.put(apiUrl.extOrderUrlWithId.replace("{0}", id) , extOrderObj, {headers: headers} )
    }   
}

