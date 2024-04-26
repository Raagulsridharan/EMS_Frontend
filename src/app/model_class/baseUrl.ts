export class BaseUrl {
    static BASE_URL: string = 'http://localhost:8080';
    static EMPLOYEE_BASE_URL: string = `${BaseUrl.BASE_URL}/employees`;
    static DEPARTMENT_BASE_URL: string = `${BaseUrl.BASE_URL}/departments`;
}
