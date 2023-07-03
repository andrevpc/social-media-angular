import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
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
import {NgFor, AsyncPipe} from '@angular/common';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { ModalModule } from '../modal/modal.module';
import { HomePageService } from '../services/homePage/home-page.service';
import { IPostResult } from '../Interfaces/IPostResult';
import { Router } from '@angular/router';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
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
    MatButtonModule, MatDividerModule, MatIconModule, ModalModule],
})
export class MainPageComponent {

  constructor(private service: HomePageService, private router: Router) {
    this.getAll()
  }

  allItems: IPostResult[] = [];
  items: IPostResult[] = [];
  // items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
  filteredOptions: Observable<string[]> | undefined;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue)).slice(0,5);
  }

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
    this.service.allPosts()
      .subscribe(res => {
        res.forEach((value) => {
          this.allItems.push(value)
          console.log(value.title)
        })
        this.items = this.allItems
        console.log(this.allItems)
      })
  }
}