import { WeekDay } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Leave } from 'src/app/Models/leave';
import { LeaveService } from 'src/app/Services/leave.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  public errmsg:string
  public errmsg2:string
  public errmsg3:string
  l:Leave;
  l2:Leave
  public Leavelist:Leave[]
  eid:number 
  lstart:Date
  lend:Date
  lid:number
  msg:string
  pid:number
  count:number
  constructor(private LService:LeaveService,
    private router:Router,
    private route:ActivatedRoute) {
      this.l = new Leave();
      //this.l2=new Leave();
      this.eid = Number(JSON.parse(sessionStorage.getItem('Userid')));
      this.PendingLeaveRequest()
     }

  ngOnInit(): void {
  }
  AddLeave(){
    this.l2=new Leave();
    this.l2.EmployeeId = this.eid;
    this.l2.LeaveStartDate = this.lstart;
    this.l2.LeaveEndDate = this.lend;
    this.l2.ProjectId=this.pid;
    this.l2.LeaveStatus="Pending";
      this.LService.GetLeaveCount(this.l2.LeaveStartDate,this.l2.LeaveEndDate).subscribe(res=>{
          this.l2.LeaveCount=res;
          return this.LService.AddLeave(this.l2).subscribe(res=>{
          },
          (error) => {
            if(error instanceof HttpErrorResponse) {
               // Handle error
               this.errmsg3 = error.error.text
            }
          })
      }
      
      );
  }
  UpdateLeave(){
    return this.LService.UpdateLeave(this.lid,this.lstart,this.lend).subscribe(res=>{},
      (error) => {
        if(error instanceof HttpErrorResponse) {
           // Handle error
           this.errmsg = error.error.text
        }
      })
  }
  RemoveLeave(){
    return this.LService.RemoveLeave(this.lid).subscribe(res=>{},
      (error) => {
        if(error instanceof HttpErrorResponse) {
           // Handle error
           this.errmsg2 = error.error.text
        }
      })
  }
  PendingLeaveRequest()
  {
    this.LService.PendingLeaveRequest().subscribe(res=>{
      this.msg=""
      if(Object.keys(res).length === 0){
        this.msg="No record found"
       }
      this.Leavelist = [];
      res.map((lst:any)=>{
        var temp = new Leave();

        temp.EmployeeId=lst.employeeId;
        temp.LeaveId=lst.leaveId;
        temp.LeaveStartDate=lst.leaveStartDate;
        temp.LeaveEndDate=lst.leaveEndDate;
        temp.LeaveCount=lst.leaveCount;
        temp.LeaveStatus=lst.leaveStatus;
        this.Leavelist.push(temp);
      })
      },
      (error) => {
        if(error instanceof HttpErrorResponse) {
           // Handle error
           this.errmsg3 = error.error.text
        }
      }
    );
  }
  // GetLeaves(){
  //   this.LService.GetLeaves(this.eid).subscribe(res=>{
  //     if(Object.keys(res).length === 0){
  //       this.msg="No record found"
  //      }
  //      this.Leavelist = [];
  //     res.map((lst:any)=>{
  //       var temp=new Leave();
  //       temp.EmployeeId=lst.employeeId;
  //       temp.LeaveId=lst.leaveId;
  //       temp.LeaveStartDate=lst.leaveStartDate;
  //       temp.LeaveEndDate=lst.leaveEndDate;
  //       temp.LeaveCount=lst.leaveCount;
  //       temp.LeaveStatus=lst.leaveStatus;
  //       this.Leavelist.push(temp);
  //     })
  //   })
  // }
}
