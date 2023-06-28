import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LogInUserService } from '../services/user/log-in-user.service';
import { ILoginUser } from '../ILoginUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,
    FormsModule, ReactiveFormsModule, NgIf,
    MatButtonModule, MatIconModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule],
})
export class LogInComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  
  constructor(private service: LogInUserService, private router: Router) { }

  LogInUserService: ILoginUser =
    {
      username: "",
      password: ""
    }

  add() {
    this.service.add(this.LogInUserService)
      .subscribe(res => {
        console.log(res.success)
        if(res.success)
        {
          this.router.navigate(['/main-page-component']);
        }
      })
  }

  username = new FormControl('', [Validators.required, Validators.minLength(8)]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

}
