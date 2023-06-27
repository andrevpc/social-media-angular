import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NewForumComponent } from './new-forum/new-forum.component';
import { NewPostComponent } from './new-post/new-post.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'main-page-component', component: MainPageComponent },
  { path: 'sign-in-component', component: SignInComponent },
  { path: 'log-in-component', component: LogInComponent },
  { path: 'new-post-component', component: NewPostComponent },
  { path: 'new-forum-component', component: NewForumComponent },
  { path: '', component: MainComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }