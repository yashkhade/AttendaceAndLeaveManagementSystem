import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  product_api = environment.product_api
  constructor(private http:HttpClient) { }

  
  CheckLogin(Role:string,EmployeeId:number,Password:string):Observable<boolean>{
    return this.http.get<boolean>(this.product_api+'Login/checklogin?Role='+Role+'&EmployeeId='+EmployeeId+'&Password='+Password)
  }
}
