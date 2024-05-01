import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BaseUrl } from '../model_class/baseUrl';
import { HttpStatusClass } from '../model_class/httpStatusClass';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(private http: HttpClient) {}

  getCountOfPayroll(): Observable<any>{
    return this.http.get<HttpStatusClass>(BaseUrl.PAYROLL_URL+'/count')
    .pipe(
      catchError((error: any) => {
        if (error.statusCode === 400 || error.statusCode === 500) {
          alert('Invalid inputs. Please try again.');
        }
        else {
          console.error('Failed to getting LeaveAssign. Error:', error);
        }
        return throwError(error);
      })
    );
  }

  getPayrollData(filterData: any): Observable<any>{
    return this.http.post<HttpStatusClass>(BaseUrl.PAYROLL_URL+'/all', filterData)
    .pipe(
      catchError((error: any) => {
        if (error.statusCode === 400 || error.statusCode === 500) {
          alert('Invalid inputs. Please try again.');
        }
        else {
          console.error('Failed to filter Leaveassign. Error:', error);
        }
        return throwError(error);
      })
    );
  }
}
