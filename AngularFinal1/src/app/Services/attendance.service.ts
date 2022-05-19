import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Attendance } from '../Models/attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  product_api = environment.product_api;
  constructor(private http:HttpClient) { }

  GetAttendance(EmployeeId:number):Observable<Attendance[]>
  {
    //invoking the endpoint and returning the attendance array
    return this.http.get<Attendance[]>(this.product_api+"Attendance/GetbyEmployeeId?EmployeeId="+EmployeeId);
  }
  GetAttendanceByDate(EmployeeId:number,date:Date):Observable<any>
  {
    //invoking the endpoint and returning the attendance array
    return this.http.get<Attendance>(this.product_api+"Attendance/Getbydate/"+date+"?Id="+EmployeeId);
  }
  UpdateAttendance(EmployeeId:number,date:Date,AttendanceCheck:string):Observable<any>
  {
    return this.http.put<string>(this.product_api+"Attendance/updateattendance?EmployeeId="+EmployeeId+"&Date="+date+"&AttendanceCheck="+AttendanceCheck,EmployeeId);
  }
  DeleteAttendance(aId:number):Observable<string>
  {
    return this.http.delete<string>(this.product_api+"Attendance/deleteattendance/"+aId);
  }
  GetAttendanceByMonth(EmployeeId:number,month:number,year:number):Observable<Attendance[]>
  {
    return this.http.get<Attendance[]>(this.product_api+"Attendance/Getbymonth/"+month+"?EmployeeId="+EmployeeId+"&year="+year)
  }
  GetAttendanceByYear(EmployeeId:number,year:number):Observable<Attendance[]>{
    return this.http.get<Attendance[]>(this.product_api+"Attendance/Getbyyear/"+year+"?EmployeeId="+EmployeeId)
  }
  AddAttendance(employeeId:number,AttendanceDate:Date,AttendanceCheck:string):Observable<string>{
    return this.http.post<string>(this.product_api+"Attendance/addattendance?employeeId="+employeeId+"&AttendanceDate="+AttendanceDate+"&AttendanceCheck="+AttendanceCheck,employeeId)
  }
  PendingAttendance(employeeId:number):Observable<string[]>{
    return this.http.get<string[]>(this.product_api+"Attendance/GetPendingAttendance/"+employeeId)
  }
}
