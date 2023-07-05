import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './main-page/main-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { NewPostComponent } from './new-post/new-post.component';
import { NewForumComponent } from './new-forum/new-forum.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModalModule } from './modal/modal.module';
import { ModalComponent } from './modal/modal.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    NotFoundPageComponent,
    MainComponent,
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MainPageComponent,
    NewForumComponent,
    AppRoutingModule,
    NewPostComponent,
    HttpClientModule,
    SignInComponent,
    LogInComponent,
    UserComponent,
    BrowserModule,
    CommonModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
