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
import { LeaveAssign } from '../model_class/leaveAssign';
import { BaseUrl } from '../model_class/baseUrl';

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
  private empHasLeaveURL = 'http://localhost:8080/employeeHasLeave';

  constructor(private httpClient: HttpClient) {}

  getCountOfTotalEmployees(): Observable<number> {
    return this.httpClient.get<number>(`${this.employeeURL}/count`).pipe(
      catchError((error: any) => {
        console.error('API request failed:', error);
        return throwError(error);
      })
    );
  }

  getCountOfTotalDepartments(): Observable<HttpStatusClass> {
    return this.httpClient
      .get<HttpStatusClass>(`${this.departmentURL}/count`)
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

  sentEmailForLoginCredential(
    username: string,
    password: string,
    deptId: number
  ): Observable<any> {
    const loginData = { username, password, deptId };
    console.log('Email Credential Data:', loginData);

    return this.httpClient.post(`${this.emailUrl}`, loginData).pipe(
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

  getAllEmployeesRoleAndSalary(): Observable<HttpStatusClass> {
    console.log('Fetching All employees role & salary...');

    return this.httpClient.get<HttpStatusClass>(`${this.roleSalaryURL}`).pipe(
      catchError((error: any) => {
        console.error('API request failed:', error);
        return throwError(error);
      })
    );
  }

  getAllEmployeesPayroll(): Observable<HttpStatusClass> {
    console.log('Fetching All employees role & salary...');

    return this.httpClient.get<HttpStatusClass>(`${this.payrollURL}`).pipe(
      catchError((error: any) => {
        console.error('API request failed:', error);
        return throwError(error);
      })
    );
  }

  getEmployeesForRoleAssigningByDepartment(
    departmentId: number
  ): Observable<HttpStatusClass> {
    console.log('Fetching Employees by Department for Role assigning...');

    return this.httpClient
      .get<HttpStatusClass>(BaseUrl.EMPLOYEE_BASE_URL+`/role-assign/${departmentId}`)
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

  addRoleAndSalaryForEmployee(
    empId: number,
    roleId: number,
    salaryPack: number
  ): Observable<any> {
    const roleSalaryData = {
      roleId,
      salaryPack,
    };
    return this.httpClient
      .post(`${this.roleSalaryURL}/${empId}`, roleSalaryData)
      .pipe(
        tap((response) => {
          console.log('Add Role&Salary Response:', response);
        }),
        catchError((error) => {
          console.error('Error adding Role and salary:', error);
          console.log('Error Response Body:', error.error);
          throw error;
        })
      );
  }

  getEmployeesForPayrollAssigningByDepartment(
    departmentId: number
  ): Observable<HttpStatusClass> {
    console.log('Fetching Employees by Department for Payroll assigning...');

    return this.httpClient
      .get<HttpStatusClass>(BaseUrl.EMPLOYEE_BASE_URL+`/payroll/${departmentId}`)
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

  createPayrollForEmployee(empId: number): Observable<any> {
    const body = {};
    return this.httpClient
      .post(`${this.payrollURL}/createPayroll/${empId}`, body)
      .pipe(
        tap((response) => {
          console.log('Add Payroll Response:', response);
        }),
        catchError((error) => {
          console.error('Error adding payroll:', error);
          console.log('Error Response Body:', error.error);
          throw error;
        })
      );
  }

  getEmployeesForLeaveAssigningByDepartment(
    departmentId: number
  ): Observable<HttpStatusClass> {
    console.log('Fetching Employees by Department for Leave assigning...');

    return this.httpClient
      .get<HttpStatusClass>(BaseUrl.EMPLOYEE_BASE_URL+`/leave-assign/${departmentId}`)
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

  getAllLeaveType(): Observable<HttpStatusClass> {
    console.log('Fetching All LeaveTypes...');

    return this.httpClient.get<HttpStatusClass>(`${this.leaveTypeURL}`).pipe(
      catchError((error: any) => {
        console.error('API request failed:', error);
        return throwError(error);
      })
    );
  }

  assignLeaveForEmployee(empId: number, leaveAssign: any): Observable<any> {
    console.log(empId, leaveAssign);
    return this.httpClient
      .post(`${this.empHasLeaveURL}/${empId}`, leaveAssign)
      .pipe(
        tap((response) => {
          console.log('Add Leave For Employee Response:', response);
        }),
        catchError((error) => {
          console.error('Error adding Leave For Employee:', error);
          console.log('Error Response Body:', error.error);
          throw error;
        })
      );
  }

  getAllEmployeesHasLeave(): Observable<HttpStatusClass> {
    console.log('Fetching All employees role & salary...');

    return this.httpClient.get<HttpStatusClass>(`${this.empHasLeaveURL}`).pipe(
      catchError((error: any) => {
        console.error('API request failed:', error);
        return throwError(error);
      })
    );
  }

  updateDepartment(
    departmentId: number,
    updatedDepartment: string
  ): Observable<HttpStatusClass> {
    const departmentData = {
      id: departmentId,
      name: updatedDepartment,
    };

    return this.httpClient
      .put<HttpStatusClass>(
        `${this.departmentURL}/${departmentId}`,
        departmentData
      )
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

  updateDesignation(
    designationId: number,
    updatedDesignation: string,
    salaryPackage: string
  ): Observable<HttpStatusClass> {
    const designationData = {
      role: updatedDesignation,
      salary_package: salaryPackage,
    };

    return this.httpClient
      .put<HttpStatusClass>(
        `${this.designationURL}/${designationId}`,
        designationData
      )
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

  updateEmployee(
    empId: number,
    departmentId: number,
    mobile: number,
    address: string
  ): Observable<HttpStatusClass> {
    const employeeData = {
      mobile,
      address,
      departmentId,
    };

    return this.httpClient
      .put<HttpStatusClass>(`${this.employeeURL}/${empId}`, employeeData)
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

  deleteEmployee(empId: number): Observable<any> {
    return this.httpClient.delete(`${this.employeeURL}/${empId}`).pipe(
      catchError((error: any) => {
        console.error('API request failed:', error);
        return throwError(error);
      })
    );
  }

  updateRoleAndSalaryForEmployee(
    empId: number,
    roleId: number,
    salaryPack: number
  ): Observable<any> {
    const roleSalaryData = {
      roleId,
      salaryPack,
    };
    return this.httpClient
      .put(`${this.roleSalaryURL}/${empId}`, roleSalaryData)
      .pipe(
        tap((response) => {
          console.log('Update Role&Salary Response:', response);
        }),
        catchError((error) => {
          console.error('Error adding Role and salary:', error);
          console.log('Error Response Body:', error.error);
          throw error;
        })
      );
  }

  makePayment(
    empId: string,
    month: string,
    description: string
  ): Observable<any> {
    const paymentData = { month, description };
    console.log('Email Credential Data:', paymentData, empId);

    return this.httpClient
      .post(`${this.payrollURL}/${empId}`, paymentData)
      .pipe(
        tap((response) => {
          console.log('Payment done...', response);
        }),
        catchError((error) => {
          console.error('Error in payment sending:', error);
          console.log('Error Response Body:', error.error);
          throw error;
        })
      );
  }

  getEmployeesPayroll(empId: any): Observable<HttpStatusClass> {
    console.log('Fetching employees salary details...');

    return this.httpClient
      .get<HttpStatusClass>(`${this.payrollURL}/${empId}`)
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

  exportPDF(empId: any): void {
    console.log('Exporting PDF...');
    this.httpClient
      .get(`${this.payrollURL}/exportPDF/${empId}`, { responseType: 'blob' })
      .subscribe(
        (response: Blob) => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `payslip_${empId}.pdf`;
          link.click();
        },
        (error: any) => {
          console.error('Error exporting PDF:', error);
          // Handle error if needed
        }
      );
  }

  getAllApprovedLeaves(): Observable<HttpStatusClass> {
    return this.httpClient
      .get<HttpStatusClass>(`${this.leaveAppliedURL}/getAllApprovedLeaves`)
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

  getAllRequestedLeaves(): Observable<HttpStatusClass> {
    return this.httpClient
      .get<HttpStatusClass>(`${this.leaveAppliedURL}/getAllRequestedLeaves`)
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }
  getAllRejectedLeaves(): Observable<HttpStatusClass> {
    return this.httpClient
      .get<HttpStatusClass>(`${this.leaveAppliedURL}/getAllRejectedLeaves`)
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

  updateLeaveStatus(
    id: number,
    empId: number,
    leaveType: number,
    status: string
  ): Observable<any> {
    const leaveData = {
      id,
      empId,
      leaveType,
      status,
    };
    console.log(leaveData);
    return this.httpClient.put<any>(`${this.leaveAppliedURL}`, leaveData).pipe(
      catchError((error: any) => {
        console.error('API request failed:', error);
        return throwError(error);
      })
    );
  }

  gettingEmployeeLeaves(empId: any): Observable<HttpStatusClass> {
    return this.httpClient
      .get<HttpStatusClass>(`${this.empHasLeaveURL}/${empId}`)
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

  updateLeaveForEmployee(empId: number, leaveAssign: any): Observable<any> {
    console.log(empId, leaveAssign);
    return this.httpClient
      .put(`${this.empHasLeaveURL}/${empId}`, leaveAssign)
      .pipe(
        tap((response) => {
          console.log('Update Leave For Employee Response:', response);
        }),
        catchError((error) => {
          console.error('Error Updating Leave For Employee:', error);
          console.log('Error Response Body:', error.error);
          throw error;
        })
      );
  }

  updateEmployeesPayroll(
    empId: any,
    payrollId: number,
    description: string
  ): Observable<HttpStatusClass> {
    console.log('updating employees payroll...');

    const payrollData = {
      id: payrollId,
      description: description,
    };

    return this.httpClient
      .put<HttpStatusClass>(`${this.payrollURL}/${empId}`, payrollData)
      .pipe(
        catchError((error: any) => {
          console.error('API request failed:', error);
          return throwError(error);
        })
      );
  }

  
}
