import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatIconModule} from '@angular/material/icon'
import { ActivatedRoute, Router } from '@angular/router';
import { UserPageService } from '../services/user/user-page.service';
import { IForumLikedFilter } from '../Interfaces/IForumLikedFilter';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ScrollingModule, MatIconModule],
})
export class UserComponent implements AfterContentInit {
  constructor(private service: UserPageService, private router: Router, private route: ActivatedRoute,
    private changeDetection: ChangeDetectorRef) {}
  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);
  itemsLiked = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);
  subscription: any;
  id = 0
  forms = new FormData()
  pic = ""

  ngOnInit() {
      this.subscription = this.route.params.subscribe((params) => {
          let userId = params['id'];
          if(!userId)
          {
            this.getId()
            return
          }
          this.id = userId
          this.getPic(String(this.id))
          this.filterByLiked()
        });
      }
      
      ngAfterContentInit(): void{}
      
      ngOnDestroy() {
        this.subscription.unsubscribe();
      }
      getId() {
        let jwt = sessionStorage.getItem("jwt")
        
        this.forms.append('data', jwt !== null ? jwt : "")
        this.service.getId(this.forms)
        .subscribe(res => {
          this.id = res
          this.getPic(String(res))
          this.filterByLiked()
        })
      }

  getPic(id: string) {
    console.log(id)
    this.forms.append("userId", id)
    this.service.getPic(this.forms)
      .subscribe(res =>
        {
          this.pic = res ? res : "../../assets/images/user.svg"
          this.changeDetection.detectChanges();
        })
  }

  filterByLiked = () => {
    let IForumFilter: IForumLikedFilter =
    {
      jwt: sessionStorage.getItem("jwt"),
      idUserPage: this.id
    }
    this.service.filterByLiked(IForumFilter)
      .subscribe(res => {
        console.log(res)
      })
    this.changeDetection.detectChanges();
  }
}