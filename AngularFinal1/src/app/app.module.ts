import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './Components/admin/admin.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { LoginComponent } from './Components/login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginService } from './Services/login.service';
import { AdminService } from './Services/admin.service';
import { ProjectComponent } from './Components/project/project.component';
import { LeaveComponent } from './Components/leave/leave.component';
import { AttendanceComponent } from './Components/attendance/attendance.component';
import { EmployeehomeComponent } from './Components/employeehome/employeehome.component';
import { EmployeemanagerComponent } from './Components/employeemanager/employeemanager.component';
import { LeaverequestComponent } from './Components/leaverequest/leaverequest.component';
import { ManagerattendanceComponent } from './Components/managerattendance/managerattendance.component';
import { AdminattendanceComponent } from './Components/adminattendance/adminattendance.component';
import { AdminleaveComponent } from './Components/adminleave/adminleave.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    EmployeeComponent,
    LoginComponent,
    ProjectComponent,
    LeaveComponent,
    AttendanceComponent,
    EmployeehomeComponent,
    EmployeemanagerComponent,
    LeaverequestComponent,
    ManagerattendanceComponent,
    AdminattendanceComponent,
    AdminleaveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [LoginService,AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
