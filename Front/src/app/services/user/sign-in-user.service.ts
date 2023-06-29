import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISignUser } from '../../Interfaces/ISigninUser';

@Injectable({
  providedIn: 'root'
})
export class SignInUserService {

  constructor(private http: HttpClient) { }
  
  add(ISignUser: ISignUser){
    return this.http.post("http://localhost:5208/user/signin", ISignUser)
  }
}
