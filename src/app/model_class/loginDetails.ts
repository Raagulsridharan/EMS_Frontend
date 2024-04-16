import { Employee } from "./employee";

export interface Logindetails{
    id: number;
    username: string;
    password: string;
    flag: number;
    acctivatedOn: Date;
    employee: Employee[];
}