import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormsModule,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { NewForumService } from '../services/forum/new-forum.service';
import { INewForum } from '../Interfaces/INewForum';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-new-forum',
  templateUrl: './new-forum.component.html',
  styleUrls: ['./new-forum.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule, ReactiveFormsModule, NgIf],
})
export class NewForumComponent {
  constructor(private service: NewForumService) { }

  NewForumService: INewForum =
    {
      title: "",
      forumDescription: "",
      ownerIdjwt: ""
    }

  add() {
    console.log(this.NewForumService)
    console.log(sessionStorage.getItem("Id"))
    this.NewForumService.ownerIdjwt = sessionStorage.getItem("Id") ?? ""
    this.service.add(this.NewForumService)
      .subscribe(res => {
        console.log(res)
      })
  }

  ownerIdjwt = sessionStorage.getItem("Id")
  title = new FormControl('', []);
  forumDescription = new FormControl('', []);

}
