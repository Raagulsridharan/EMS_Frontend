import { Injectable } from '@angular/core';
import { BaseUrl } from '../model_class/baseUrl';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpStatusClass } from '../model_class/httpStatusClass';
import { Designation } from '../model_class/designation';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(private httpClient: HttpClient) {}

  designation: Designation[];

  getRolesByDepartment(departmentId: number): Observable<Designation[]> {
    //console.log('Fetching Roles by Department for Role assigning...');

    return this.httpClient
      .get<HttpStatusClass>(BaseUrl.DESIGNATION_URL+`/by-department/${departmentId}`)
      .pipe(
        map ((response:HttpStatusClass)=>{
          this.designation = response.data;
          return this.designation;
        }),
        catchError((error: any) => {
          //console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }
}
