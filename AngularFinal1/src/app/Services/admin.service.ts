import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, observable } from 'rxjs';
import { Employee } from '../Models/employee';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  product_api = environment.product_api;
  constructor(private http:HttpClient) { 
    
  }

  AddEmployee(empId:Employee):Observable<Employee>{
    return this.http.post<Employee>(this.product_api+"Employee/AddEmployeenew",empId);
  }
  DeleteEmployeeById(id:number):Observable<string>{
    return this.http.delete<string>(this.product_api+"Employee/DeleteEmployeebyEmployeeID/"+id);
  }
  UpdateEmployee(EmployeeId:number,EmployeeName:string,EmployeeEmailId:string,EmployeeDOB:Date,EmployeeDesignation:string,EmployeeDepartment:string):Observable<string>{
    return this.http.put<string>(this.product_api+"Employee/UpdateEmployee?EmployeeId="+EmployeeId+"&EmployeeName="+EmployeeName+"&EmployeeEmailId="+EmployeeEmailId+"&EmployeeDOB="+EmployeeDOB+"&EmployeeDesignation="+EmployeeDesignation+"&EmployeeDepartment="+EmployeeDepartment,EmployeeId)
  }
  GetEmployeeById(id:number):Observable<Employee>{
    return this.http.get<Employee>(this.product_api+"Employee/GetEmployeebyEmployeeId/"+id)
  }
  GetEmployee():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.product_api+"Employee/GetEmployees")
  }
}
