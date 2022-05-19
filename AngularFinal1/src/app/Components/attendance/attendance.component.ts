import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Attendance } from 'src/app/Models/attendance';
import { Leave } from 'src/app/Models/leave';
import { AttendanceService } from 'src/app/Services/attendance.service';
import { LeaveService } from 'src/app/Services/leave.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  public sessionStorage = sessionStorage;

  a:Attendance;
  public errmsg:string
  public errmsgremove:string
  public errmsgupdate:string
  public errpending:string
  l:Leave;
  eid:number
  adate:Date
  acheck:string
  aid:number
  a1:Attendance[]
  a3:Attendance[]
  a4:Attendance[]
  a2:string[]
  mon:number
  yr:number
  msg:string
  msg2:string
  msg3:string
  msg4:string
  msg5:string
  constructor(private AService:AttendanceService,
    private LService:LeaveService,
    private router:Router,
    private attendance:AttendanceService,
    private route:ActivatedRoute) {
      this.sessionStorage = sessionStorage;

      this.a=new Attendance();
      this.a1=[];
      this.a2=[];
      this.eid = Number(JSON.parse(sessionStorage.getItem('Userid')));
      this.PendingAttendance();
     }

  ngOnInit(): void {
  }
  AddAttendance(){
    
    return this.AService.AddAttendance(this.eid,this.adate,this.acheck).subscribe(res=>{
      console.log(res);
    },
    (error) => {
      if(error instanceof HttpErrorResponse) {
         // Handle error
         this.errmsg = error.error.text
      }
    })
  }
  UpdateAttendance(){
    
    return this.AService.UpdateAttendance(this.eid,this.adate,this.acheck).subscribe(res=>{
      console.log(res);
    },
    (error) => {
      if(error instanceof HttpErrorResponse) {
         // Handle error
         this.errmsgupdate = error.error.text
      }
    })
  }
  DeleteAttendance(){
    return this.AService.DeleteAttendance(this.aid).subscribe(res=>{
    },
    (error) => {
      if(error instanceof HttpErrorResponse) {
         // Handle error
         this.errmsgremove = error.error.text
      }
    })
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
        temp.AttendanceId=lst.attendanceId;
        temp.EmployeeId = lst.EmployeeId;
        temp.AttendanceDate = lst.attendanceDate;
        temp.AttendanceCheck = lst.attendanceCheck;
        this.a1.push(temp);
      })
    })
  }
  // GetAttendanceByDate(){
  //   return this.attendance.GetAttendanceByDate(this.eid,this.adate).subscribe(res=>{
  //     this.msg2=""
  //     if(Object.keys(res).length === 0){
  //       this.msg2="No record found"
  //      }
  //      this.a=new Attendance();
  //     this.a.AttendanceCheck=res.attendanceCheck;
  //     this.a.AttendanceDate=res.attendanceDate;
  //     this.a.AttendanceId=res.attendanceId;
  //     this.a.EmployeeId=res.employeeId;
  //   })
  // }
  GetAttendanceByMonth(){
   return this.attendance.GetAttendanceByMonth(this.eid,this.mon,this.yr).subscribe(res=>{
     this.msg3=""
    if(Object.keys(res).length === 0){
      this.msg3="No record found"
     }
     this.a3=[];
    res.map((lst:any)=>{
      var temp = new Attendance();
      temp.AttendanceId=lst.attendanceId;
      temp.EmployeeId = lst.employeeId;
      temp.AttendanceDate = lst.attendanceDate;
      temp.AttendanceCheck = lst.attendanceCheck;
      this.a3.push(temp);
    })
   },
    (error) => {
      if(error instanceof HttpErrorResponse) {
         // Handle error
         this.errmsg = error.error.text
      }
    })
  }
  GetAttendanceByYear(){
    return this.attendance.GetAttendanceByYear(this.eid,this.yr).subscribe(res=>{
      this.msg4=""
      if(Object.keys(res).length === 0){
        this.msg4="No record found"
       }
      this.a4=[];
      res.map((lst:any)=>{
        var temp = new Attendance();
        temp.AttendanceId=lst.attendanceId;
        temp.EmployeeId = lst.employeeId;
        temp.AttendanceDate = lst.attendanceDate;
        temp.AttendanceCheck = lst.attendanceCheck;
        this.a4.push(temp);
      })
    },
    (error) => {
      if(error instanceof HttpErrorResponse) {
         // Handle error
         this.errmsg = error.error.text
      }
    })
   }
   PendingAttendance(){
    return this.attendance.PendingAttendance(this.eid).subscribe(res=>{
      this.msg5=""
      if(Object.keys(res).length === 0){
        this.msg5="No record found"
       }
       this.a2=[];
       res.map((lst:any)=>{
         this.a2.push(lst);
       })
     })
    }
  }