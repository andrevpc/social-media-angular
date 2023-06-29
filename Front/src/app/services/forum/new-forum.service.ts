import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INewForum } from 'src/app//Interfaces/INewForum';

@Injectable({
  providedIn: 'root'
})
export class NewForumService {
  constructor(private http: HttpClient) { }

  add(INewForum: INewForum) {
    return this.http.post("http://localhost:5208/forum/create", INewForum)
  }
}