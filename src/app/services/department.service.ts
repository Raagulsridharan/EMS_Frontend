import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpStatusClass } from '../model_class/httpStatusClass';
import { BaseUrl } from '../model_class/baseUrl';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private http: HttpClient
  ) {}

  filter(filterData: any): Observable<any>{
    return this.http.post<HttpStatusClass>(BaseUrl.DEPARTMENT_BASE_URL+'/all', filterData)
    .pipe(
      catchError((error: any) => {
        if (error.statusCode === 400 || error.statusCode === 500) {
          alert('Invalid inputs. Please try again.');
        }
        else {
          console.error('Failed to filter Departments. Error:', error);
        }
        return throwError(error);
      })
    );
  }
}
