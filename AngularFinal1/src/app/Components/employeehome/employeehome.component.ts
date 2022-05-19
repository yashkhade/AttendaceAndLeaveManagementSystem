import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Attendance } from 'src/app/Models/attendance';
import { Leave } from 'src/app/Models/leave';
import { AttendanceService } from 'src/app/Services/attendance.service';
import { LeaveService } from 'src/app/Services/leave.service';

@Component({
  selector: 'app-employeehome',
  templateUrl: './employeehome.component.html',
  styleUrls: ['./employeehome.component.css']
})
export class EmployeehomeComponent implements OnInit {

  eid:number
  constructor() { this.eid = Number(JSON.parse(sessionStorage.getItem('Userid')));}

  ngOnInit(): void {
  }
  

}
