import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Models/employee';
import { AdminService } from 'src/app/Services/admin.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public Emplist:Employee[]
  public errmsg:string
  public errmsgremove:string
  public errmsgupdate:string
  public admin:Employee
  public eid:number
  public ename:string
  public email:string
  public edob:Date
  public edesig:string
  public edept:string
  public epass:string
  msg:string
  constructor(private EmpService:AdminService,
    private adminService:AdminService,
    private router:Router,
    private route:ActivatedRoute) {
      this.admin = new Employee();
      this.GetEmployees();
     }

  ngOnInit(): void {
  }
  AddEmployee(){
    this.EmpService.AddEmployee(this.admin).subscribe(res=>{
    },
    (error) => {
      if(error instanceof HttpErrorResponse) {
         // Handle error
         this.errmsg = error.error.text
      }
    })
    
  }
  UpdateEmployee(){
    
    this.EmpService.UpdateEmployee(this.eid,this.ename,this.email,this.edob,this.edesig,this.edept).subscribe(res=>{
      
    },
    (error) => {
      if(error instanceof HttpErrorResponse) {
         // Handle error
         this.errmsgupdate = error.error.text
      }
    })
  }
  DeleteEmployeeById(){
    this.EmpService.DeleteEmployeeById(this.eid).subscribe(res=>{
    },
    (error) => {
      if(error instanceof HttpErrorResponse) {
         // Handle error
         this.errmsgremove = error.error.text
      }
    })  
  }
  GetEmployees()
  {
    this.adminService.GetEmployee().subscribe(res=>{
      if(Object.keys(res).length === 0){
        this.msg="No record found"
       }
      this.Emplist = [];
      res.map((lst:any)=>{
        var temp = new Employee();
        temp.EmployeeID = lst.employeeId;
        temp.EmployeeName = lst.employeeName;
        temp.EmployeeEmailId = lst.employeeEmailId;
        temp.EmployeeDOB = lst.employeeDOB;
        temp.EmployeeDesignation = lst.employeeDesignation;
        temp.EmployeeDepartment = lst.employeeDepartment;
        this.Emplist.push(temp);
      })
      }
      );
  }
}
