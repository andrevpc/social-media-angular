import { Component, importProvidersFrom, ElementRef, ViewChild, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormsModule,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  ReactiveFormsModule,
  UntypedFormArray
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { NewPostService } from '../services/post/new-post.service';
import { INewPost } from '../Interfaces/INewPost';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {NgFor, AsyncPipe} from '@angular/common';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { type } from 'jquery';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule, ReactiveFormsModule, NgIf, MatChipsModule,
    NgFor, MatIconModule, MatAutocompleteModule, AsyncPipe
  ],
})
export class NewPostComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]> | null = null;
  fruits: string[] = [];
  allFruits: string[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> = {} as ElementRef;;

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
    
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.fruits.includes(event.option.viewValue)) {
      this.fruits.push(event.option.viewValue);
    }
    
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(this.fruits)

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  constructor(private service: NewPostService) {


    this.userCanPost()
   }

  NewPostService: INewPost =
    {
      title: "",
      forumId: [],
      postMessage: "",
      ownerIdjwt: ""
    }

  addA() {
    this.NewPostService.ownerIdjwt = sessionStorage.getItem("jwt") ?? ""
    this.service.add(this.NewPostService)
      .subscribe(res => {
      })
  }

  title = new FormControl('', []);
  // forumIdstr = new FormControl('', []);
  // forumId = +this.forumIdstr
  postMessage = new FormControl('', []);


  userCanPost = () => {
    this.service.userCanPost()
      .subscribe(res => {
        res.forEach((value) =>{
        if(value.title && value.title.trim())
          this.allFruits.push(value.title)
        })
        this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
          startWith(null),
          map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
        )
    })
  }
}