import { Employee } from "./employee";
import { LeaveType } from "./leaveType";

export class LeaveApplied{
    id: number;
    employee: Employee = new Employee;
    leaveType: LeaveType = new LeaveType;
    note: string;
    noOfdays: number;
    fromDate: any;
    toDate: any;
    status: string;
    submittedOn: any;
}