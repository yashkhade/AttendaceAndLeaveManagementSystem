import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, observable } from 'rxjs';
import { Project } from '../Models/project';
import { ReturnStatement } from '@angular/compiler';
import { Employeeproject } from '../Models/employeeproject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  proj:Project;
  id:number
  product_api = environment.product_api;
  constructor(private http:HttpClient) { 
    this.proj = new Project()
  }

  AddProject(proj:Project):Observable<any>{
    return this.http.post<Project>(this.product_api+"Project/AddProject?ProjectName="+proj.ProjectName,{});
  }
  DeleteProjectById(id:number):Observable<number>{
    return this.http.delete<number>(this.product_api+"Project/DeleteProject?Pid="+id);
  }
  UpdateProject(ProjectId:number,ProjectName:string):Observable<string>{
    return this.http.put<string>(this.product_api+"Project/UpdateProject?ProjectId="+ProjectId+"&ProjectName="+ProjectName,ProjectId)
  }
  AddEmployeeProject(projId:number,EmpId:number):Observable<any>{
    return this.http.post<Project>(this.product_api+"EmployeeProject/addEmployeeProject?EmployeeId="+EmpId+"&ProjectId="+projId,{})
  }
  
  GetAllProjects():Observable<Project[]>{
    return this.http.get<Project[]>(this.product_api+"Project/GetProject")
   }
}
