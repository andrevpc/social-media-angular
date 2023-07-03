import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPostResult } from 'src/app/Interfaces/IPostResult';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  constructor(private http: HttpClient) { }

  allPosts() {
    return this.http.get<IPostResult[]>('http://localhost:5208/post/allPosts')
  }
}
