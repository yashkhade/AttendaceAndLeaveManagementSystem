import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employeeproject } from '../Models/employeeproject';
import { Employee } from '../Models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeprojectService {
  product_api = environment.product_api

  constructor(private http:HttpClient) { }
  AddEmployeeProject(EmployeeId:number,ProjectId:number):Observable<Employeeproject>{
    return this.http.post<Employeeproject>(this.product_api+"EmployeeProject/addemployeeProject?EmployeeId="+EmployeeId+"&ProjectId="+ProjectId,EmployeeId)
  }
  GetEmployeeProjectById(ProjectId:number):Observable<Employeeproject>{
    return this.http.get<Employeeproject>(this.product_api+"EmployeeProject/GetEmployeeProjectbyEmployeeId?Employeeid="+ProjectId)
  }
  GetEmployeeProject():Observable<Employeeproject[]>{
    return this.http.get<Employeeproject[]>(this.product_api+"EmployeeProject/GetEmployeeProjects")
  }
  UpdateEmployeeProject(NewProjectId:number,EmployeeId:number):Observable<any>{
    return this.http.put<string>(this.product_api+"EmployeeProject/updateemployeeProject?NewProjectId="+NewProjectId+"&EmployeeId="+EmployeeId,NewProjectId)
  }
}
