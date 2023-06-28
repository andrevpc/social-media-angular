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
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
