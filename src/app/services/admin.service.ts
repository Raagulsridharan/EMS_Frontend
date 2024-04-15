import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Employee } from '../model_class/employee';
import { Department } from '../model_class/Department';
import { Designation } from '../model_class/designation';
import { RoleMapping } from '../model_class/roleMapping';
import { Payroll } from '../model_class/payroll';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private employeeURL = 'http://localhost:8080/employees';
  private departmentURL = 'http://localhost:8080/departments';
  private designationURL = 'http://localhost:8080/designations';
  private roleSalaryURL = 'http://localhost:8080/empRoleSalary';
  private payrollURL = 'http://localhost:8080/payroll';
  private leaveTypeURL = 'http://localhost:8080/leavePolicy';
  private leaveAppliedURL = 'http://localhost:8080/leaveApplied';

  constructor(private httpClient: HttpClient) {}

  getCountOfTotalEmployees(): Observable<number> {
    return this.httpClient.get<number>(`${this.employeeURL}/getEmpCount`).pipe(
      catchError((error: any) => {
        console.error('API request failed:', error);
        return throwError(error);
      })
    );
  }

  getCountOfTotalDepartments(): Observable<number> {
    return this.httpClient
      .get<number>(`${this.departmentURL}/getDeptCount`)
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

  getCountOfTotalLeaveTypes(): Observable<number> {
    return this.httpClient
      .get<number>(`${this.leaveTypeURL}/getLeaveTypesCount`)
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

  getCountOfApprovedLeaves(): Observable<number> {
    return this.httpClient
      .get<number>(`${this.leaveAppliedURL}/getApprovedLeaveCount`)
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

  getCountOfRequestedLeaves(): Observable<number> {
    return this.httpClient
      .get<number>(`${this.leaveAppliedURL}/getRequestedLeaveCount`)
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

  getCountOfRejectedLeaves(): Observable<number> {
    return this.httpClient
      .get<number>(`${this.leaveAppliedURL}/getRejectedLeaveCount`)
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

  addDepartment(department: string): Observable<any> {
    const departmentData = { name: department };
    console.log('Department Data:', departmentData);

    return this.httpClient.post(this.departmentURL, departmentData).pipe(
      tap((response) => {
        console.log('Add Department Response:', response);
      }),
      catchError((error) => {
        console.error('Error adding department:', error);
        console.log('Error Response Body:', error.error); // Log the response body
        throw error;
      })
    );
  }

  getAllDepartments(): Observable<Department[]> {
    console.log('Fetching All departments...');

    return this.httpClient.get<Department[]>(`${this.departmentURL}`).pipe(
      catchError((error: any) => {
        console.error('API request failed:', error);
        return throwError(error);
      })
    );
  }

  addDesignation(designation: string,salary_package:string): Observable<any> {
    const designationData = { 
      role: designation,
      salary_package: salary_package
    };
    console.log('Designation Data:', designationData);

    return this.httpClient.post(this.designationURL, designationData).pipe(
      tap((response) => {
        console.log('Add Designation Response:', response);
      }),
      catchError((error) => {
        console.error('Error adding designation:', error);
        console.log('Error Response Body:', error.error);
        throw error;
      })
    );
  }

  getAllDesignation(): Observable<Designation[]> {
    console.log('Fetching All designation...');

    return this.httpClient.get<Designation[]>(`${this.designationURL}`).pipe(
      catchError((error: any) => {
        console.error('API request failed:', error);
        return throwError(error);
      })
    );
  }

  getAllEmployees(): Observable<Employee[]> {
    console.log('Fetching All employees...');

    return this.httpClient.get<Employee[]>(`${this.employeeURL}`).pipe(
      catchError((error: any) => {
        console.error('API request failed:', error);
        return throwError(error);
      })
    );
  }

  getAllEmployeesRoleAndSalary(): Observable<RoleMapping[]> {
    console.log('Fetching All employees role & salary...');

    return this.httpClient.get<RoleMapping[]>(`${this.roleSalaryURL}`).pipe(
      catchError((error: any) => {
        console.error('API request failed:', error);
        return throwError(error);
      })
    );
  }

  getAllEmployeesPayroll(): Observable<Payroll[]> {
    console.log('Fetching All employees role & salary...');

    return this.httpClient.get<Payroll[]>(`${this.payrollURL}`).pipe(
      catchError((error: any) => {
        console.error('API request failed:', error);
        return throwError(error);
      })
    );
  }

}
