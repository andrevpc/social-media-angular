import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Component, OnInit, ChangeDetectionStrategy, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ThemePalette } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {NgFor, AsyncPipe, NgClass} from '@angular/common';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { ModalModule } from '../modal/modal.module';
import { HomePageService } from '../services/homePage/home-page.service';
import { IPostResult } from '../Interfaces/IPostResult';
import { Router } from '@angular/router';
import {  importProvidersFrom, ElementRef, ViewChild, inject } from '@angular/core';
import {
  FormGroupDirective,
  NgForm,
  Validators,
  UntypedFormArray
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { NewPostService } from '../services/post/new-post.service';
import { INewPost } from '../Interfaces/INewPost';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ILikeResult } from '../Interfaces/ILikeResult';
import { IForumFilter } from '../Interfaces/IForumFilter';
import { ILikeData } from '../Interfaces/ILikeData';
import { IPostData } from '../Interfaces/IPostData';
import { UserPageService } from '../services/user/user-page.service';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatGridListModule, MatCheckboxModule, NgFor, FormsModule,
    MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatAutocompleteModule, AsyncPipe, ScrollingModule,
    MatButtonModule, MatDividerModule, MatIconModule, ModalModule,
    MatSelectModule, NgIf, MatChipsModule, NgClass
  ],
})
export class MainPageComponent implements AfterContentInit {
  // PUBS
  constructor(private service: HomePageService, private router: Router,
    private changeDetection: ChangeDetectorRef, private userPageService: UserPageService) { }
  
  forms = new FormData()

  ngAfterContentInit(): void
  {
    this.getAllForums()
    this.getAll()
    this.id = this.userPageService.getId(sessionStorage.getItem("jwt"))
  }

  user()
  {
    this.router.navigate(['/user-component/']);
  }

  id = 0

  items: ILikeResult[] | null = null;

  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Primary', completed: false, color: 'primary' },
      { name: 'Accent', completed: false, color: 'accent' },
      { name: 'Warn', completed: false, color: 'warn' },
    ],
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }
  getAll = () => {
    let jwt = sessionStorage.getItem("jwt")
    var forms = new FormData()
    forms.append('data', jwt !== null ? jwt : "")
    this.service.allPosts(forms)
      .subscribe(res => {
        console.log(res)
        this.items = res;
        this.changeDetection.detectChanges();
      })
  }

  // FILTERS

  filterByForum = () => {
    if(this.fruits.length === 0)
    {
      this.getAll()
      return
    }
    
    let IForumFilter: IForumFilter =
    {
      jwt: sessionStorage.getItem("jwt"),
      forums: this.fruits
    }
    this.service.filterByForum(IForumFilter)
      .subscribe(res => {
        console.log(res)
        this.items = res
      })
    this.changeDetection.detectChanges();
  }
  
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
      this.filterByForum()
    }
  }
  
  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.fruits.includes(event.option.viewValue)) {
      this.fruits.push(event.option.viewValue);
    }
    
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    this.filterByForum()
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
  NewPostService: INewPost =
  {
    title: "",
    ForunsTitle: [],
    postMessage: "",
    ownerIdjwt: ""
  }

  getAllForums = () => {
    this.service.allForums()
      .subscribe(res => {
        res.forEach((value) => {
          this.allFruits.push(value.title)
        })
        this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
          startWith(null),
          map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
        )
      })
  }

  alterColor = (item: ILikeResult, bool : boolean) => {
    let jwt = sessionStorage.getItem("jwt")
    let LikeData =
    {
      isLike: bool,
      ownerIdJwt: jwt !== null ? jwt : "",
      postsId: item.post.id
    }

    if(item.iLiked === bool)
    {
      item.iLiked = null;
      item.post.likes += bool ? -1 : +1
    }
    else
    {
      item.iLiked = bool
      item.post.likes += bool ? 1 : -1
    }

    this.likeDB(LikeData)
  }

  likeDB = (LikeData: ILikeData) => {
    this.service.likeDB(LikeData).subscribe()
  }

  goToUser = (id: number) => {
    this.router.navigate(["user-component/" + id])
  }

  deletePost = (id: number, item: ILikeResult) => {
    console.log(id)
    console.log(item)
    let postData = {
      id: id
    }
    this.service.deletePost(postData).subscribe(res => {
      this.items?.splice(this.items?.indexOf(item), 1)

      var element = document.getElementById("postExclude"+id)
      element?.classList.add("exclude")
      this.changeDetection.detectChanges();
    })
  }

  getId() {
    
    let jwt = sessionStorage.getItem("jwt")

    this.forms.append('data', jwt !== null ? jwt : "")
    this.userPageService.getId(this.forms)
      .subscribe(res => {
        this.id = res
        this.changeDetection.detectChanges();
      })
  }
}