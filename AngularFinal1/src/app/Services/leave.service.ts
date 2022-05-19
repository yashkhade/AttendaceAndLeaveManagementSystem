import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Leave } from '../Models/leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  product_api = environment.product_api;

  constructor(private http:HttpClient) { }

  AddLeave(leave:Leave):Observable<string>{
    return this.http.post<string>(this.product_api+"Leaves",leave)
  }
  UpdateLeave(LeaveId:number,LeaveStartDate:Date,LeaveEndDate:Date):Observable<any>{
    return this.http.put<string>(this.product_api+"Leaves/updateleaves?LeaveId="+LeaveId+"&LeaveStartDate="+LeaveStartDate+"&LeaveEndDate="+LeaveEndDate,LeaveId)
  }
  RemoveLeave(LeaveId:number):Observable<string>{
    return this.http.delete<string>(this.product_api+"Leaves/RemoveLeave?leaveId="+LeaveId)
  }
  GetLeaves(EmployeeId:number):Observable<Leave[]>{
    return this.http.get<Leave[]>(this.product_api+"Leaves/GetleavesbyEmployeeId?EmployeeId="+EmployeeId)
  }
  PendingLeaveRequest():Observable<Leave[]>{
    return this.http.get<Leave[]>(this.product_api+"Leaves/GetpendingLeavesbyEmployeeId")
  }
  PendingLeaveResponse(LeaveId:number,LeaveStatus:string):Observable<string>{
    return this.http.put<string>(this.product_api+"Leaves/viewpendingleavesResponse?LeaveId="+LeaveId+"&LeaveStatus="+LeaveStatus,LeaveId)
  }
  GetLeaveCount(From:Date,To:Date):Observable<number>{
    return this.http.get<number>(this.product_api+"Leaves/CountLeaves?from="+From+"&to="+To)
  }
}
