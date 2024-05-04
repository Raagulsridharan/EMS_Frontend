import { Department } from "./department";

export class Designation{
    id: number;
    role: string;
    salary_package: string;
    departmentId: number;
    department: Department = new Department;
}