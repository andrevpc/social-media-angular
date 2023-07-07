import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IForumResult } from 'src/app/Interfaces/IForumResult';
import { ILikeResult } from 'src/app/Interfaces/ILikeResult';
import { IForumFilter } from 'src/app/Interfaces/IForumFilter';
import { ILikeData } from 'src/app/Interfaces/ILikeData';
import { IPostData } from 'src/app/Interfaces/IPostData';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  constructor(private http: HttpClient) { }

  allPosts(string: FormData) {
    return this.http.post<ILikeResult[]>('http://localhost:5208/post/allPosts', string)
  }

  allForums() {
    return this.http.get<IForumResult[]>('http://localhost:5208/forum/allForums')
  }

  filterByForum(obj: IForumFilter) {
    return this.http.post<ILikeResult[]>('http://localhost:5208/post/filterByForum', obj)
  }

  likeDB(LikeData: ILikeData) {
    return this.http.post("http://localhost:5208/like/create", LikeData)
  }

  deletePost(id: IPostData) {
    return this.http.post("http://localhost:5208/post/delete", id)
  }
}