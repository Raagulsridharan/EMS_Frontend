import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveApplied } from '../model_class/leaveApplied';
import { Observable, catchError, throwError } from 'rxjs';
import { BaseUrl } from '../model_class/baseUrl';
import { HttpStatusClass } from '../model_class/httpStatusClass';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  constructor(private http: HttpClient) {}

  applyingLeave(empId: number, leaveData: LeaveApplied): Observable<any> {
    return this.http
      .post(BaseUrl.LEAVE_APPLIED_URL+`/${empId}`, leaveData)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  getEmployeeLeaveHistory(empId: number): Observable<HttpStatusClass> {
    return this.http
      .get<HttpStatusClass>(BaseUrl.LEAVE_APPLIED_URL+`/${empId}`)
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

  getEmployeeLeaveHistoryCount(empId: any): Observable<HttpStatusClass> {
    return this.http
      .get<HttpStatusClass>(BaseUrl.LEAVE_APPLIED_URL+`/count/${empId}`)
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

}