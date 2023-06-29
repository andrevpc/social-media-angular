import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INewPost } from 'src/app/Interfaces/INewPost';
import { IForumResult } from '../../Interfaces/IForumResult'

@Injectable({
  providedIn: 'root'
})
export class NewPostService {
  constructor(private http: HttpClient) { }

  add(INewPost:INewPost) {
    return this.http.post("http://localhost:5208/post/create",INewPost)
  }

  userCanPost() {
    return this.http.get<IForumResult[]>(`http://localhost:5208/forum/userCanPost`)
  }
}
