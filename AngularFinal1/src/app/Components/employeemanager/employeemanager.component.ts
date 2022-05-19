import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employeemanager',
  templateUrl: './employeemanager.component.html',
  styleUrls: ['./employeemanager.component.css']
})
export class EmployeemanagerComponent implements OnInit {

  eid:number
  constructor() {this.eid = Number(JSON.parse(sessionStorage.getItem('Userid'))); }

  ngOnInit(): void {
  }

}
