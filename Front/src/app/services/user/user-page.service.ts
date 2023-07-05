import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserPageService {

  constructor(private http: HttpClient) { }
  
  getId(string: FormData){
    return this.http.post<number>("http://localhost:5208/user/getId", string)
  }
}
