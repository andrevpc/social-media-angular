import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIconModule } from '@angular/material/icon'
import { ActivatedRoute, Router } from '@angular/router';
import { UserPageService } from '../services/user/user-page.service';
import { IForumLikedFilter } from '../Interfaces/IForumLikedFilter';
import { ILikeResult } from '../Interfaces/ILikeResult';
import { NgClass, NgIf } from '@angular/common';
import { ILikeData } from '../Interfaces/ILikeData';
import { HomePageService } from '../services/homePage/home-page.service';
import { IFollowData } from '../Interfaces/IFollowData';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { IUsernameData } from '../Interfaces/IUsernameData';
import { IFollowingResult } from '../Interfaces/IFollowingResult';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ScrollingModule, MatIconModule, NgClass,
    MatButtonModule, MatDividerModule, NgIf],
})
export class UserComponent implements AfterContentInit {
  constructor(private service: UserPageService, private serviceHomePage: HomePageService, private router: Router, private route: ActivatedRoute,
    private changeDetection: ChangeDetectorRef) { }
  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);
  itemsLiked: ILikeResult[] | null = null;
  subscription: any;
  id = 0
  userId = 0
  forms = new FormData()
  pic = ""
  username = ""
  follows: any
  btnTxt = "Follow"
  itemsFollowing: IUsernameData[] | null = null

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.userId = params['id'];
      if (!this.userId) {
        this.getId()
        return
      }
      this.getPic(String(this.userId))
      this.filterByLiked()
      this.getName(String(this.userId))

      let jwt = sessionStorage.getItem("jwt")

      this.forms.append('data', jwt !== null ? jwt : "")
      this.service.getId(this.forms)
        .subscribe(res => {
          this.id = res
          if (this.id === +this.userId) {
            var element = document.getElementById("btn")
            element?.classList.add("btn")
          }
          else {
            let FollowData =
            {
              followerId: this.id,
              userId: +this.userId
            }
            this.findFollow(FollowData)
            this.findFollowing(FollowData)
          }

          this.changeDetection.detectChanges();
        })

      this.changeDetection.detectChanges();
    });
  }

  ngAfterContentInit(): void { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  getId() {
    let jwt = sessionStorage.getItem("jwt")

    this.forms.append('data', jwt !== null ? jwt : "")
    this.service.getId(this.forms)
      .subscribe(res => {
        this.id = res
        this.userId = res
        this.getPic(String(res))
        this.filterByLiked()
        this.getName(String(this.id))

        let FollowData =
        {
          followerId: this.id,
          userId: +this.userId
        }
        this.findFollowing(FollowData)

        var element = document.getElementById("btn")
        element?.classList.add("btn")
        this.changeDetection.detectChanges();
      
      })
  }

  getPic(id: string) {
    console.log(id)
    this.forms.append("userId", id)
    this.service.getPic(this.forms)
      .subscribe(res => {
        this.pic = res ? res : "../../assets/images/user.svg"
        this.changeDetection.detectChanges();
      })
  }

  filterByLiked = () => {
    let IForumFilter: IForumLikedFilter =
    {
      jwt: sessionStorage.getItem("jwt"),
      idUserPage: this.userId
    }
    this.service.filterByLiked(IForumFilter)
      .subscribe(res => {
        this.itemsLiked = res
        this.changeDetection.detectChanges();
      })
  }

  alterColor = (item: ILikeResult, bool: boolean) => {
    let jwt = sessionStorage.getItem("jwt")
    let LikeData =
    {
      isLike: bool,
      ownerIdJwt: jwt !== null ? jwt : "",
      postsId: item.post.id
    }

    if (item.iLiked === bool) {
      item.iLiked = null;
      item.post.likes += bool ? -1 : +1
    }
    else {
      item.iLiked = bool
      item.post.likes += bool ? 1 : -1
    }

    this.likeDB(LikeData)
  }

  likeDB = (LikeData: ILikeData) => {
    this.serviceHomePage.likeDB(LikeData).subscribe()
  }

  getName = (string: string) => {
    this.forms.append("id", string)
    this.service.getName(this.forms)
      .subscribe(
        res => {
          this.username = res
          this.changeDetection.detectChanges();
        }
      )
  }

  createFollowBtn = () => {
    let FollowData =
    {
      followerId: this.id,
      userId: this.userId
    }
    console.log(FollowData)
    this.createFollow(FollowData)
  }

  createFollow = (obj: IFollowData) => {
    this.service.createFollow(obj)
      .subscribe(res => {
        this.btnTxt = (this.btnTxt === "Following") ? "Follow" : "Following"
        this.changeDetection.detectChanges();
      }
      )
  }

  findFollow = (obj: IFollowData) => {
    this.service.findFollow(obj)
      .subscribe(
        res => {
          this.follows = res
          if (!this.follows) {
            this.btnTxt = "Following"
          }
          this.changeDetection.detectChanges();
        }
      )
  }

  findFollowing = (obj: IFollowData) => {
    this.service.findFollowing(obj)
      .subscribe(
        res => {
          console.log(res)
          this.itemsFollowing = res
          this.changeDetection.detectChanges();
        }
      )
  }

  goToUser = (id: number) => {
    this.router.navigate(["user-component/" + id])
  }

}