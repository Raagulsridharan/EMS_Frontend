import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Payment } from '../../../../model_class/payment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpStatusClass } from '../../../../model_class/httpStatusClass';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.scss'
})
export class PaymentHistoryComponent implements OnInit{

  formData!: FormGroup;
  empId!: string;

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.empId = params['id']; // Assuming the parameter name is 'id' from the URL
    });
    this.formData = this.formBuilder.group({
      month: ['',Validators.required],
      description: ['', Validators.required]
    });
  }

  submitForm(): void{
    console.log(this.empId,this.formData.value.description);
    const empId: number = this.formData.value.employeeId;
    this.adminService.makePayment(this.empId,this.formData.value.month, this.formData.value.description).subscribe(
      response => {
        console.log('Payment make successfully:', response);
        this.formData.reset();
      },
      error => {
        alert('Error in send Payment...!')
        console.error('Error send Payment:', error);
        this.formData.reset();
      }  
    );
  }

  //----------------------------------------

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'paid_salary','description','month','status','payslip'];
  dataSource = new MatTableDataSource<Payment>();


  ngAfterViewInit() {
    // Fetch data asynchronously using the service
    this.adminService.getEmployeesPayroll(this.empId).subscribe((response: HttpStatusClass) => {
     // Assign the data to the dataSource
     console.log(response);
     
     this.dataSource.data = response.data;

     // Set up sorting and pagination
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   });
 }

 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
 }

 exportPDF(payrollId:number){
  this.adminService.exportPDF(payrollId);
 }

}
