import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/Models/project';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/Services/project.service';
import { EmployeeprojectService } from 'src/app/Services/employeeproject.service';
import { Employeeproject } from 'src/app/Models/employeeproject';
import { AdminService } from 'src/app/Services/admin.service';
import { AdminComponent } from '../admin/admin.component';
import { Employee } from 'src/app/Models/employee';
import { EmployeeComponent } from '../employee/employee.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public proj:Project
  public id:number
  public EmpId:number
  public ProjId:number
  public ProjName:string
  public response:string
  public Projectlist:Project[]
  public EmpProject:Employeeproject[]
  public Emplist:Employee[]
  public errmsg:string
  msg1:string
  msg2:string
  msg3:string
  constructor(private projectService:ProjectService,
    private empprojectService:EmployeeprojectService,
    private adminService:AdminService,
    private router:Router,
    private route:ActivatedRoute) {
    this.proj = new Project();
    this.Projectlist=[];
    this.EmpProject=[];
    this.Emplist=[];
    this.GetAllProjects();
    this.GetEmployeeProject();
    this.GetEmployees();
   }

  ngOnInit(): void {
  }

  Add(){
    this.projectService.AddProject(this.proj).subscribe(res=>{
    },
    (error) => {
      if(error instanceof HttpErrorResponse) {
         // Handle error
         this.errmsg = error.error.text
      }
    });
  }
  DeleteProjectById()
  {
    this.projectService.DeleteProjectById(this.id).subscribe(res=>{
    },
    (error) => {
      if(error instanceof HttpErrorResponse) {
         // Handle error
         this.errmsg = error.error.text
      }
    })
  }
  UpdateProject(){
    this.projectService.UpdateProject(this.ProjId,this.ProjName).subscribe(res=>{
   
    },
    (error) => {
      if(error instanceof HttpErrorResponse) {
         // Handle error
         this.errmsg = error.error.text
      }
    })
  }
  addEmployeeProject(){
    this.projectService.AddEmployeeProject(this.ProjId,this.EmpId).subscribe(res=>{
      
    },
    (error) => {
      if(error instanceof HttpErrorResponse) {
         // Handle error
         this.errmsg = error.error.text
      }
    });
  }
  UpdateEmployeeProject(){
    this.empprojectService.UpdateEmployeeProject(this.ProjId,this.EmpId).subscribe(res=>{
    
    },
    (error) => {
      if(error instanceof HttpErrorResponse) {
         // Handle error
         this.errmsg = error.error.text
      }
    })
  }

  GetAllProjects(){
    this.projectService.GetAllProjects().subscribe(res=>{
      if(Object.keys(res).length === 0){
        this.msg1="No record found"
       }
      this.Projectlist = [];
      res.map((lst:any)=>{
        var temp = new Project();
        temp.ProjectId = lst.projectId;
        temp.ProjectName = lst.projectName;
        this.Projectlist.push(temp);
    
      })
    },
    (error) => {
      if(error instanceof HttpErrorResponse) {
         // Handle error
         this.errmsg = error.error.text
      }
    })
  }
  GetEmployees()
  {
    this.adminService.GetEmployee().subscribe(res=>{
      if(Object.keys(res).length === 0){
        this.msg2="No record found"
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
  GetEmployeeProject(){
    this.empprojectService.GetEmployeeProject().subscribe(res=>{
      if(Object.keys(res).length === 0){
        this.msg3="No record found"
       }
      this.EmpProject = [];
      res.map((lst:any)=>{
        var temp = new Employeeproject();
        temp.EmployeeId = lst.employeeId;
        temp.ProjectId = lst.projectId;
        temp.ProjectName = lst.projectName;
        this.EmpProject.push(temp);
      })
    },
    (error) => {
      if(error instanceof HttpErrorResponse) {
         // Handle error
         this.errmsg = error.error.text
      }
    })
  }
}
