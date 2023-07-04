import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IForumResult } from 'src/app/Interfaces/IForumResult';
import { IPostResult } from 'src/app/Interfaces/IPostResult';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  constructor(private http: HttpClient) { }

  allPosts() {
    return this.http.get<IPostResult[]>('http://localhost:5208/post/allPosts')
  }

  allForums() {
    return this.http.get<IForumResult[]>('http://localhost:5208/forum/allForums')
  }

  filterByForum(strings : string[]) {
    return this.http.post<IPostResult[]>('http://localhost:5208/post/filterByForum', strings)
  }
}