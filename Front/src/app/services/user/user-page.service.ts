import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFollowData } from 'src/app/Interfaces/IFollowData';
import { IForumLikedFilter } from 'src/app/Interfaces/IForumLikedFilter';
import { IForumResult } from 'src/app/Interfaces/IForumResult';
import { ILikeResult } from 'src/app/Interfaces/ILikeResult';
import { IUsernameData } from 'src/app/Interfaces/IUsernameData';

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

  getName(string: FormData){
    return this.http.post("http://localhost:5208/user/getName", string, {responseType: "text"})
  }

  filterByLiked(obj: IForumLikedFilter) {
    return this.http.post<ILikeResult[]>('http://localhost:5208/post/filterByLiked', obj)
  }

  createFollow(obj: IFollowData) {
    return this.http.post("http://localhost:5208/follow/create", obj)
  }

  findFollow(obj: IFollowData) {
    return this.http.post("http://localhost:5208/follow/findFollow", obj)
  }

  findFollowing(obj: IFollowData) {
    return this.http.post<IUsernameData[]>("http://localhost:5208/follow/findFollowing", obj)
  }

  forumsUserOwns(string: FormData) {
    return this.http.post<IForumResult[]>("http://localhost:5208/forum/forumsUserOwns", string)
  }
}