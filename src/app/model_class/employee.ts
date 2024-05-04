import { Department } from "./department";

export class Employee{
    id: number;
    emp_name: string;
    birthday: number;
    gender: string;
    mobile: number;
    email: string;
    address: string;
    department: Department;
    status: string;
    deptId: number;
}