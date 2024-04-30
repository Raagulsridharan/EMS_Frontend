export interface Payroll{
    id: number;
    empId: number;
    emp_name: string;
    dept: string;
    role: string;
    salaryPack: string;
    basic_sal_month: number;
    tax_reduction_month: number;
    net_sal_month:number;
}