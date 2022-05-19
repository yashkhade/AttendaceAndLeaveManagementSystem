import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Leave } from 'src/app/Models/leave';
import { LeaveService } from 'src/app/Services/leave.service';

@Component({
  selector: 'app-adminleave',
  templateUrl: './adminleave.component.html',
  styleUrls: ['./adminleave.component.css']
})
export class AdminleaveComponent implements OnInit {
  public Leavelist:Leave[]
  eid:number
  msg:string
  constructor(private LService:LeaveService,
    private router:Router,
    private route:ActivatedRoute) { 
      // this.PendingLeaveRequest();
    }

  ngOnInit(): void {
  }
  GetLeaves(){
    this.LService.GetLeaves(this.eid).subscribe(res=>{
      this.msg=""
      if(Object.keys(res).length === 0){
        this.msg="No record found"
       }
       this.Leavelist = [];
      res.map((lst:any)=>{
        var temp=new Leave();
        temp.EmployeeId=lst.employeeId;
        temp.LeaveId=lst.leaveId;
        temp.LeaveStartDate=lst.leaveStartDate;
        temp.LeaveEndDate=lst.leaveEndDate;
        temp.LeaveCount=lst.leaveCount;
        temp.LeaveStatus=lst.leaveStatus;
        this.Leavelist.push(temp);
      })
    })
  }

}

