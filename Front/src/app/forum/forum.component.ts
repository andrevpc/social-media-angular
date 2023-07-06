import { AfterContentInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements AfterContentInit {
  subscription: any;
  forumTitle: any;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngAfterContentInit(): void {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
        this.forumTitle = params['title'];
    });
  }
}
