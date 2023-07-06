import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IForumLikedFilter } from 'src/app/Interfaces/IForumLikedFilter';
import { ILikeResult } from 'src/app/Interfaces/ILikeResult';

@Injectable({
  providedIn: 'root'
})
export class UserPageService {

  constructor(private http: HttpClient) { }
  
  getId(string: FormData){
    return this.http.post<number>("http://localhost:5208/user/getId", string)
  }

  getPic(string: FormData){
    return this.http.post("http://localhost:5208/user/getPic", string, {responseType: 'text'})
  }

  filterByLiked(obj: IForumLikedFilter) {
    return this.http.post<ILikeResult[]>('http://localhost:5208/post/filterByLiked', obj)
  }
}