import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveApplied } from '../model_class/leaveApplied';
import { Observable, catchError, map, throwError } from 'rxjs';
import { BaseUrl } from '../model_class/baseUrl';
import { HttpStatusClass } from '../model_class/httpStatusClass';
import { ToastrService } from 'ngx-toastr';
import { LeaveType } from '../model_class/leaveType';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  constructor(
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  leaveApplied: LeaveApplied;
  applyingLeave(empId: number, leaveData: LeaveApplied): Observable<LeaveApplied> {
    return this.http
      .post<HttpStatusClass>(BaseUrl.LEAVE_APPLIED_URL+`/${empId}`, leaveData)
      .pipe(
        map((response)=>{
          if(response.data){
            this.leaveApplied = response.data;
            return this.leaveApplied;
          }else{
            this.toastr.error('Please check your remaining leave balance for '+leaveData.leaveType.leaveType);
            return null;
          }
        }),
        catchError((error) => {
          throw error;
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

  getCountOfLeaveAssign(): Observable<any>{
    return this.http.get<HttpStatusClass>(BaseUrl.EMPLOYEE_HAS_LEAVE+'/count')
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

  filter(filterData: any): Observable<any>{
    return this.http.post<HttpStatusClass>(BaseUrl.EMPLOYEE_HAS_LEAVE, filterData)
    .pipe(
      catchError((error: any) => {
        if (error.statusCode === 400 || error.statusCode === 500) {
          //alert('Invalid inputs. Please try again.');
        }
        else {
          //console.error('Failed to filter Leaveassign. Error:', error);
          this.toastr.error('Something Error occurs!')
        }
        return throwError(error);
      })
    );
  }

  getEmployeeLeaveTypes(empId:any): Observable<LeaveType[]>{
    return this.http.get<HttpStatusClass>(BaseUrl.LEAVE_POLICY+'/employee/'+empId).pipe(
      map((response)=>{
        return response.data;
      }),
      catchError((error: any) => {
        throw error;
      })
    );
  }

}
