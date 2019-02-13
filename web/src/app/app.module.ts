import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { HeaderComponent } from './core/header/header.component';
import { AddGoalPageComponent } from './add-goal-page/add-goal-page.component';
import { InviteUserComponent } from './dialogs/invite-user/invite-user.component';

import { GoalService } from './services/goal.service';
import { CommentService } from './services/comment.service';


@NgModule({
   declarations: [
      AppComponent,
      MainPageComponent,
      DetailPageComponent,
      HeaderComponent,
      AddGoalPageComponent,
      InviteUserComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      HttpClientModule,
      MarkdownModule.forRoot()
   ],
   providers: [GoalService, CommentService],
   entryComponents: [InviteUserComponent],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
