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

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(private service : SignInUserService) { }

  SignInUserService : ISignUser =
  {
      email : "",
      username : "",
      age : new Date(),
      password : ""
  }

  add(){
    this.service.add(this.SignInUserService)
      .subscribe(res => {
        console.log(res)
      })
  }

  
  username = new FormControl('', [Validators.required, Validators.minLength(8)]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

}