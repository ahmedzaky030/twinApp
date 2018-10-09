import {Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { apiUrl } from './apiUrl.config';
import "rxjs/add/operator/map";

@Injectable()
export class ItemApi {
    constructor(private http: Http){}

    searchItemUrl  = apiUrl.itemUrlWithSearch;
    itemWithIdUrl = apiUrl.itemUrlWithId;
    itemUrl = apiUrl.itemUrl;
    
    getItemList(search?: string): Observable<any>{
        let url = search ? this.searchItemUrl.replace("{0}", search) : this.itemUrl;
        return  this.http.get(url).map(res => res.json())
    }

    createItem(itemObj: any){
        let headers = new Headers();
        headers.set("Content-Type","application/json");
        headers.set("Accept", "*/*");
        return this.http.post(apiUrl.itemUrl, itemObj , {headers:headers  })
    }

    deleteItem(id:string){
        console.log('id',id);
        return this.http.delete(apiUrl.itemUrlWithId.replace("{0}", id))
    }

    modifyItem(id:string, itemObj:any){
        console.log('id',id);
        
        let headers = new Headers();
        headers.set("Content-Type","application/json");
        headers.set("Accept", "*/*");
        return this.http.put(apiUrl.itemUrlWithId.replace("{0}", id) , itemObj, {headers: headers} )
    }

   
}

