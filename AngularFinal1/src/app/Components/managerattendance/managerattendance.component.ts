import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Attendance } from 'src/app/Models/attendance';
import { AttendanceService } from 'src/app/Services/attendance.service';

@Component({
  selector: 'app-managerattendance',
  templateUrl: './managerattendance.component.html',
  styleUrls: ['./managerattendance.component.css']
})
export class ManagerattendanceComponent implements OnInit {

  a:Attendance;
  a1:Attendance[]
  a2:Attendance[]
  a3:Attendance[]
  eid:number
  adate:Date
  mon:number
  yr:number
  msg:string
  msg1:string
  msg2:string
  msg3:string
  constructor(private router:Router,
    private route:ActivatedRoute,
    private attendance:AttendanceService) {
      this.a=new Attendance();
      this.a1=[];
      this.GetAttendance();
      //this.GetAttendanceByDate();
      this.GetAttendanceByMonth();
      this.GetAttendanceByYear();
     }

  ngOnInit(): void {
  }

  GetAttendance(){
    return this.attendance.GetAttendance(this.eid).subscribe(res=>{
      this.msg=""
      if(Object.keys(res).length === 0){
        this.msg="No record found"
       }
      this.a1=[];
      res.map((lst:any)=>{
        var temp = new Attendance();
        temp.EmployeeId = lst.employeeId;
        temp.AttendanceDate = lst.attendanceDate;
        temp.AttendanceCheck = lst.attendanceCheck;
        this.a1.push(temp);
      })   
    })
  }
  // GetAttendanceByDate(){
  //   return this.attendance.GetAttendanceByDate(this.eid,this.adate).subscribe(res=>{
  //     this.msg1=""
  //     if(Object.keys(res).length === 0){
  //       this.msg1="No record found"
  //      }
  //     this.a.EmployeeId=res.employeeId;
  //     this.a.AttendanceDate=res.attendanceDate;
  //     this.a.AttendanceCheck=res.attendanceCheck;
  //     this.a.AttendanceId=res.attendanceId;
  //   })
  // }
  GetAttendanceByMonth(){
   return this.attendance.GetAttendanceByMonth(this.eid,this.mon,this.yr).subscribe(res=>{
     this.msg2=""
    if(Object.keys(res).length === 0){
      this.msg2="No record found"
     }
     this.a2=[];
    res.map((lst:any)=>{
      var temp = new Attendance();
      temp.EmployeeId = lst.employeeId;
      temp.AttendanceDate = lst.attendanceDate;
      temp.AttendanceCheck = lst.attendanceCheck;
      this.a2.push(temp);
    })
   })
  }
  GetAttendanceByYear(){
    return this.attendance.GetAttendanceByYear(this.eid,this.yr).subscribe(res=>{
      this.msg3=""
      if(Object.keys(res).length === 0){
        this.msg3="No record found"
       }
      this.a3=[];
      res.map((lst:any)=>{
        var temp = new Attendance();
        temp.EmployeeId = lst.employeeId;
        temp.AttendanceDate = lst.attendanceDate;
        temp.AttendanceCheck = lst.attendanceCheck;
        this.a3.push(temp);
      })
    })
   }
}
