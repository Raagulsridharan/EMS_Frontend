import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Employee } from '../model_class/employee';
import { Department } from '../model_class/department';
import { Designation } from '../model_class/designation';
import { RoleMapping } from '../model_class/roleMapping';
import { Payroll } from '../model_class/payroll';
import { HttpStatusClass } from '../model_class/httpStatusClass';
import { Logindetails } from '../model_class/loginDetails';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private employeeURL = 'http://localhost:8080/employees';
  private departmentURL = 'http://localhost:8080/departments';
  private designationURL = 'http://localhost:8080/designations';
  private roleSalaryURL = 'http://localhost:8080/empRoleSalary';
  private emailUrl = 'http://localhost:8080/email';
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

  getAllDepartments(): Observable<HttpStatusClass> {
    console.log('Fetching All departments...');

    return this.httpClient.get<HttpStatusClass>(`${this.departmentURL}`).pipe(
      catchError((error: any) => {
        console.error('API request failed:', error);
        return throwError(error);
      })
    );
  }

  addDesignation(designation: string, salary_package: string): Observable<any> {
    const designationData = {
      role: designation,
      salary_package: salary_package,
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

  getAllDesignation(): Observable<HttpStatusClass> {
    console.log('Fetching All designation...');

    return this.httpClient.get<HttpStatusClass>(`${this.designationURL}`).pipe(
      catchError((error: any) => {
        console.error('API request failed:', error);
        return throwError(error);
      })
    );
  }

  addEmployee(employeeData: any): Observable<any> {
    return this.httpClient.post(`${this.employeeURL}`, employeeData).pipe(
      tap((response) => {
        console.log('Add Employee Response:', response);
      }),
      catchError((error) => {
        console.error('Error adding employee:', error);
        console.log('Error Response Body:', error.error);
        throw error;
      })
    );
  }

  sentEmailForLoginCredential( username: string, password: string, deptId: number): Observable<any> {
    const loginData = { username, password, deptId };
    console.log('Email Credential Data:', loginData);

    return this.httpClient.post(this.emailUrl, loginData).pipe(
      tap((response) => {
        console.log('Email sent...', response);
      }),
      catchError((error) => {
        console.error('Error in email sending:', error);
        console.log('Error Response Body:', error.error);
        throw error;
      })
    );
  }

  getAllEmployees(): Observable<HttpStatusClass> {
    console.log('Fetching All employees...');

    return this.httpClient.get<HttpStatusClass>(`${this.employeeURL}`).pipe(
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

  getEmployeesForRoleAssigningByDepartment(departmentId:number): Observable<HttpStatusClass>{
    console.log('Fetching Employees by Department for Role assigning...');

    return this.httpClient.get<HttpStatusClass>(`${this.employeeURL}/getAllEmployeeByDeptForRoleAssign/${departmentId}`).pipe(
      catchError((error: any) => {
        console.error('API request failed:', error);
        return throwError(error);
      })
    );
  }
}
