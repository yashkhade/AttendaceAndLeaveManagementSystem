import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Models/employee';
import { AdminService } from 'src/app/Services/admin.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public admin:Employee
  public id:number
  eid:number
  ename:string
  email:string
  edob:Date
  edesig:string
  edept:string
  epass:string
  constructor(private adminService:AdminService,
    private router:Router,
    private route:ActivatedRoute) {
      this.admin = new Employee();
     }

  ngOnInit(): void {
  }

  AddEmployee(){
    this.adminService.AddEmployee(this.admin).subscribe(res=>{

    })
    
  }
  UpdateEmployee(){
    this.adminService.UpdateEmployee(this.eid,this.ename,this.email,this.edob,this.edesig,this.edept).subscribe(res=>{
        
    })
  }
  AddEmployeeProject(EmployeeId:number,ProjectId:number){

  }
  DeleteEmployeeById(){
    this.adminService.DeleteEmployeeById(this.id).subscribe(res=>{

    })
  }
  
  GetEmployeeProject(ProjectId:number){

  }
  UpdateEmployeeProject(NewProjectId:number,EmployeeId:number){

  }
}
