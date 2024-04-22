import { Employee } from "./employee";
import { LeaveType } from "./leaveType";

export interface LeaveApplied{
    id: number;
    employee: Employee;
    leaveType: LeaveType;
    note: string;
    noOfdays: number;
    fromDate: any;
    toDate: any;
    status: string;
    submittedOn: any;
}