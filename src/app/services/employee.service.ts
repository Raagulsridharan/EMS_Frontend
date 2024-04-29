import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../model_class/baseUrl';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpStatusClass } from '../model_class/httpStatusClass';
import { Employee } from '../model_class/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  emp: Employee;

  constructor(private http: HttpClient) {}

  getEmployeeById(empId: any): Observable<HttpStatusClass> {
    console.log('Fetching All employees...');

    return this.http
      .get<HttpStatusClass>(BaseUrl.EMPLOYEE_BASE_URL + `/${empId}`)
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

  updateEmployeeProfile(
    empId: number,
    employee: any,
    departmentId: number
  ): Observable<HttpStatusClass> {
    const empData = {
      mobile: employee.updateMobile,
      address: employee.updateAddress,
      departmentId,
    };
    console.log(empData, 'log');
    return this.http
      .put<HttpStatusClass>(BaseUrl.EMPLOYEE_BASE_URL + `/${empId}`, empData)
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

  changePassword(empId: number, password: string) {
    const passwordData = {
      empId,
      password,
    };
    console.log(passwordData, 'log');
    return this.http
      .put<HttpStatusClass>(
        BaseUrl.LOGIN_DETAILS_URL + `/${empId}`,
        passwordData
      )
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

  employeeDetailsCard(empId:number) :Observable<HttpStatusClass>{
    return this.http.get<HttpStatusClass>(BaseUrl.EMPLOYEE_BASE_URL+`/card/${empId}`)
    .pipe(
      catchError((error: any) => {
        console.error('API request failed:', error);
        return throwError(error);
      })
    );
  }

  salaryDetailCard(empId:number): Observable<HttpStatusClass> {
    console.log('Fetching All employees role & salary...');

    return this.http.get<HttpStatusClass>(BaseUrl.PAYROLL_URL+`/detail/${empId}`)
    .pipe(
      catchError((error: any) => {
        console.error('API request failed:', error);
        return throwError(error);
      })
    );
  }
}
