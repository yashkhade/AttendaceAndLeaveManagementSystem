import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Components/admin/admin.component';
import { AttendanceComponent } from './Components/attendance/attendance.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { EmployeehomeComponent } from './Components/employeehome/employeehome.component';
import { EmployeemanagerComponent } from './Components/employeemanager/employeemanager.component';
import { LeaveComponent } from './Components/leave/leave.component';
import { LoginComponent } from './Components/login/login.component';
import { ProjectComponent } from './Components/project/project.component';
import { LeaverequestComponent } from './Components/leaverequest/leaverequest.component';
import { ManagerattendanceComponent } from './Components/managerattendance/managerattendance.component';
import { AdminattendanceComponent } from './Components/adminattendance/adminattendance.component';
import { AdminleaveComponent } from './Components/adminleave/adminleave.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'project',component:ProjectComponent},
  {path:'leave',component:LeaveComponent},
  {path:'employeehome',component:EmployeehomeComponent},
  {path:'attendance',component:AttendanceComponent},
  {path:'employeemanager',component:EmployeemanagerComponent},
  {path:'leaverequest',component:LeaverequestComponent},
  {path:'managerattendance',component:ManagerattendanceComponent},
  {path:'adminattendance',component:AdminattendanceComponent},
  {path:'adminleave',component:AdminleaveComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
