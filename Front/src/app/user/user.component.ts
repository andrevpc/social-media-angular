import { AfterContentInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatIconModule} from '@angular/material/icon'
import { ActivatedRoute, Router } from '@angular/router';
import { UserPageService } from '../services/user/user-page.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ScrollingModule, MatIconModule],
})
export class UserComponent implements AfterContentInit {
  constructor(private service: UserPageService, private router: Router, private route: ActivatedRoute) {}
  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);
  subscription: any;
  id = 0

  ngOnInit() {
      this.subscription = this.route.params.subscribe((params) => {
          let userId = params['id'];
          if(!userId)
          {
            this.getId()
            return
          }
          const id = userId
          console.log(id)
      });
  }

  ngAfterContentInit(): void {}

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
  getId() {
    let jwt = sessionStorage.getItem("jwt")
    var forms = new FormData()
    forms.append('data', jwt !== null ? jwt : "")
    this.service.getId(forms)
      .subscribe(res => {
        console.log(res)
        this.id = res
      })
  }
}