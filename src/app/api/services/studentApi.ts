import {Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { apiUrl } from './apiUrl.config';
import "rxjs/add/operator/map";

@Injectable()
export class StudentApi {
    constructor(private http: Http){}

    searchStudentUrl  = apiUrl.studentUrlWithSearch;
    studentWithIdUrl = apiUrl.studentUrlWithId;
    studentUrl = apiUrl.studentUrl;
   
    getStudentList(search?: string): Observable<any>{
        let url = search ? this.searchStudentUrl.replace("{0}", search) : this.studentUrl;
        return  this.http.get(url).map(res => res.json())
    }

    createStudent(studentObj: any){
        let headers = new Headers();
        headers.set("Content-Type","application/json");
        headers.set("Accept", "*/*");
        return this.http.post(apiUrl.studentUrl, studentObj , {headers:headers  })
    }

    deleteStudent(id:string){
        
        return this.http.delete(apiUrl.studentUrlWithId.replace("{0}", id))
    }

    modifyStudent(id:string, studentObj:any){
        let headers = new Headers();
        headers.set("Content-Type","application/json");
        headers.set("Accept", "*/*");
        return this.http.put(apiUrl.studentUrlWithId.replace("{0}", id) , studentObj, {headers: headers} )
    }

   
}

