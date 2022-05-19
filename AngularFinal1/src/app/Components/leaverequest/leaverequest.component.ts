import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Leave } from 'src/app/Models/leave';
import { LeaveService } from 'src/app/Services/leave.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-leaverequest',
  templateUrl: './leaverequest.component.html',
  styleUrls: ['./leaverequest.component.css']
})
export class LeaverequestComponent implements OnInit {
  public Leavelist:Leave[]
  public list:Leave[]
  public l:Leave
  public temp:Leave
  public temp1:Leave
  eid:number
  msg:string
  msg1:string
  public errmsg:string
  constructor(private LService:LeaveService,
    private router:Router,
    private route:ActivatedRoute) { 
      this.PendingLeaveRequest();
      this.GetLeaves();
      this.Leavelist=[];
     // this.eid = Number(JSON.parse(sessionStorage.getItem('Userid')));
    }

  ngOnInit(): void {
  }
  PendingLeaveRequest()
  {
    this.LService.PendingLeaveRequest().subscribe(res=>{
      this.msg1=""
      if(Object.keys(res).length === 0){
        this.msg1="No record found"
       }
      this.Leavelist = [];
      res.map((lst:any)=>{
        var temp1=new Leave();
        temp1.EmployeeId=lst.employeeId;
        temp1.LeaveId=lst.leaveId;
        temp1.LeaveStartDate=lst.leaveStartDate;
        temp1.LeaveEndDate=lst.leaveEndDate;
        temp1.LeaveCount=lst.leaveCount;
        temp1.LeaveStatus=lst.leaveStatus;
        this.Leavelist.push(temp1);
      })
      }
    );
  }
  GetLeaves(){
    this.LService.GetLeaves(this.eid).subscribe(res=>{
      this.msg=""
      if(Object.keys(res).length === 0){
        this.msg="No record found"
       }
       else if(res==null){
         this.msg="Invalid EmployeeId or project is not yet assigned to this employee"
       }
       this.list = [];
      res.map((lst:any)=>{
        var temp=new Leave();
        temp.EmployeeId=lst.employeeId;
        temp.LeaveId=lst.leaveId;
        temp.LeaveStartDate=lst.leaveStartDate;
        temp.LeaveEndDate=lst.leaveEndDate;
        temp.LeaveCount=lst.leaveCount;
        temp.LeaveStatus=lst.leaveStatus;
        this.list.push(temp);
      })
    },
    (error) => {
      if(error instanceof HttpErrorResponse) {
         // Handle error
         this.errmsg = error.error.text
      }
    })
  }
  PendingLeaveResponse(id:number,res:string){
    this.LService.PendingLeaveResponse(id,res).subscribe(res=>{
      this.msg1=""
      if(Object.keys(res).length === 0){
        this.msg1="No record found"
       }
    
    })
  }

}
