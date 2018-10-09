import {Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { apiUrl } from './apiUrl.config';
import "rxjs/add/operator/map";

@Injectable()
export class ClinicApi {
    constructor(private http: Http){}
    searchClinicUrl  = apiUrl.clinicUrlWithSearch;
    clinicWithIdUrl = apiUrl.clinicUrlWithId;
    clinicUrl = apiUrl.clinicUrl;
    getClinicList(search?: string): Observable<any>{
        let url = search ? this.searchClinicUrl.replace("{0}", search) : this.clinicUrl;
       return  this.http.get(url).map(res => res.json())
    }

    createClinic(clinicObj: any){
        let headers = new Headers();
        headers.set("Content-Type","application/json");
        headers.set("Accept", "*/*");
        return this.http.post(apiUrl.clinicUrl, clinicObj , {headers:headers  })
    }

    deleteClinic(id:string){
        console.log('id',id);
        return this.http.delete(apiUrl.clinicUrlWithId.replace("{0}", id))
    }

    modifyClinic(id:string, clinicObj:any){
        console.log('id',id);
        
        let headers = new Headers();
        headers.set("Content-Type","application/json");
        headers.set("Accept", "*/*");
        return this.http.put(apiUrl.clinicUrlWithId.replace("{0}", id) , clinicObj, {headers: headers} )
    }

   
}

