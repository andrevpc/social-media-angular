import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroupDirective, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ErrorStateMatcher, MatNativeDateModule} from '@angular/material/core';
import { SignInUserService } from '../services/user/sign-in-user.service';
import { ISignUser } from '../Interfaces/ISigninUser';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,
    FormsModule, ReactiveFormsModule, NgIf,
    MatButtonModule, MatIconModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule],
})
export class SignInComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  file: any;
  form = new FormData;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(private service : SignInUserService, private router: Router) { }

  SignInUserService : ISignUser =
  {
      email : "",
      username : "",
      age : new Date(),
      password : ""
  }

  add(){
    this.form.append("email", this.SignInUserService.email)
    this.form.append("username", this.SignInUserService.username)
    this.form.append("password", this.SignInUserService.password)
    let date = this.SignInUserService.age.getTime()
    console.log(date.toString())
    this.form.append("age", date.toString())

    this.service.add(this.form)
      .subscribe(res => {
          this.router.navigate(['/']);
      })
    
    this.form = new FormData
  }

  updateImg($event: any){
    if(!$event.target.files)
      return
    this.file = $event.target.files[0]
    var newForm = new FormData
    newForm.append("Photo", this.file, this.file.name);
    this.form = newForm
  }
  
  username = new FormControl('', [Validators.required, Validators.minLength(8)]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

}