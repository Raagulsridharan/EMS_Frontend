import { Department } from "./department";

export interface Employee{
    id: number;
    name: string;
    birthday: number;
    gender: string;
    mobile: number;
    email: string;
    address: string;
    department: Department[];
    status: string;
}