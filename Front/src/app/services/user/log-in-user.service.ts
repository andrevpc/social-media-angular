import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginUser } from '../../Interfaces/ILoginUser';

@Injectable({
  providedIn: 'root'
})
export class LogInUserService {
  constructor(private http: HttpClient) { }
  
  add(ILoginUser: ILoginUser){
    return this.http.post<LogInResult>("http://localhost:5208/user/login", ILoginUser)
  }
}

interface LogInResult {
  userExist: boolean,
  success: boolean,
  jwt: string
}