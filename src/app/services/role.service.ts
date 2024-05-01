import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BaseUrl } from '../model_class/baseUrl';
import { HttpStatusClass } from '../model_class/httpStatusClass';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http: HttpClient
  ) {}

  getCountOfEmpRoleSalary(): Observable<any>{
    return this.http.get<HttpStatusClass>(BaseUrl.EMP_ROLE_SALARY+'/count')
    .pipe(
      catchError((error: any) => {
        if (error.statusCode === 400 || error.statusCode === 500) {
          alert('Invalid inputs. Please try again.');
        }
        else {
          console.error('Failed to getting EmpRoleSalary. Error:', error);
        }
        return throwError(error);
      })
    );
  }

  filter(filterData: any): Observable<any>{
    return this.http.post<HttpStatusClass>(BaseUrl.EMP_ROLE_SALARY+'/all', filterData)
    .pipe(
      catchError((error: any) => {
        if (error.statusCode === 400 || error.statusCode === 500) {
          alert('Invalid inputs. Please try again.');
        }
        else {
          console.error('Failed to filter EmpRoleSalary. Error:', error);
        }
        return throwError(error);
      })
    );
  }
}
