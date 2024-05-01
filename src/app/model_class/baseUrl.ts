export class BaseUrl {
    static BASE_URL: string = 'http://localhost:8080';
    static EMPLOYEE_BASE_URL: string = `${BaseUrl.BASE_URL}/employees`;
    static DEPARTMENT_BASE_URL: string = `${BaseUrl.BASE_URL}/departments`;
    static DESIGNATION_URL: string = `${BaseUrl.BASE_URL}/designations`;
    static LEAVE_APPLIED_URL: string = `${BaseUrl.BASE_URL}/leaveApplied`;
    static LOGIN_DETAILS_URL: string = `${BaseUrl.BASE_URL}/empLogin`;
    static PAYROLL_URL: string = `${BaseUrl.BASE_URL}/payroll`;
    static EMP_ROLE_SALARY: string = `${BaseUrl.BASE_URL}/empRoleSalary`;
    static EMPLOYEE_HAS_LEAVE: string = `${BaseUrl.BASE_URL}/employeeHasLeave`;
}
