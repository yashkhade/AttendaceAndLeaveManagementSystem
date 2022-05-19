import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/Models/login';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public errmsg:string
  public sessionStorage = sessionStorage;
  public login:Login
  ErrorMessage:string= ""
  constructor(
    private log:LoginService,
    private router:Router,
    private route:ActivatedRoute) {
    this.login = new Login();
    this.sessionStorage = sessionStorage;
   }

  ngOnInit(): void {
  }
  validate()
    {
    let EmpID = this.login.EmployeeId;
    let pass = this.login.Password;
    let role = this.login.Role;
    // let role = this.emp.role;
    this.log.CheckLogin(this.login.Role,this.login.EmployeeId,this.login.Password).subscribe(res=>{
      console.log(res);
      if(res==true){
        sessionStorage.setItem('Userid',JSON.stringify(this.login.EmployeeId));
        if(this.login.Role=="admin"){
          this.router.navigateByUrl('admin')
        }
        else{
          this.router.navigateByUrl('employeehome')
        }
        }
      else{
        this.login.Role="manager";
        this.log.CheckLogin(this.login.Role,this.login.EmployeeId,this.login.Password).subscribe(res=>{
          console.log(res);
          if(res==true){
            sessionStorage.setItem('Userid',JSON.stringify(this.login.EmployeeId));
            this.router.navigateByUrl('employeemanager')
          }
          else{
            window.alert("Invalid Credentials")
          }
        })
      }
    });
  

  }
}

