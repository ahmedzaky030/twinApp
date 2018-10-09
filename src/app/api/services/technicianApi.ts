import {Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { apiUrl } from './apiUrl.config';
import "rxjs/add/operator/map";

@Injectable()
export class TechnicianApi {
    constructor(private http: Http){}

    searchTechnicianUrl  = apiUrl.technicianUrlWithSearch;
    technicianWithIdUrl = apiUrl.technicianUrlWithId;
    technicianUrl = apiUrl.technicianUrl;
    
    getTechnicianList(search?: string): Observable<any>{
        let url = search ? this.searchTechnicianUrl.replace("{0}", search) : this.technicianUrl;
        return  this.http.get(url).map(res => res.json())
    }

    createTechnician(technicianObj: any){
        let headers = new Headers();
        headers.set("Content-Type","application/json");
        headers.set("Accept", "*/*");
        return this.http.post(apiUrl.technicianUrl, technicianObj , {headers:headers  })
    }

    deleteTechnician(id:string){
        console.log('id',id);
        return this.http.delete(apiUrl.technicianUrlWithId.replace("{0}", id))
    }

    modifyTechnician(id:string, technicianObj:any){
        console.log('id',id);
        
        let headers = new Headers();
        headers.set("Content-Type","application/json");
        headers.set("Accept", "*/*");
        return this.http.put(apiUrl.technicianUrlWithId.replace("{0}", id) , technicianObj, {headers: headers} )
    }

   
}

