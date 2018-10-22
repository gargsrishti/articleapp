import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './shared/auth.service';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { NewarticleComponent } from './newarticle/newarticle.component';
import { SettingpageComponent } from './settingpage/settingpage.component';
import { PopulartagsComponent } from './populartags/populartags.component';
import { ArticleComponent } from './article/article.component';
import { ShowarticleService } from './shared/showarticle.service';
import { SinglearticleComponent } from './singlearticle/singlearticle.component';
import { ProfileComponent } from './profile/profile.component';
import { CommentComponent } from './comment/comment.component';
import { CommentsService } from './shared/comments.service';
import { AuthguardService} from './shared/authguard.service';
import { ErrorslistComponent } from './errorslist/errorslist.component';
import { FeedsdisplayComponent } from './feedsdisplay/feedsdisplay.component';

const routes : Routes = [
  {
    path: '', component: ArticleComponent
  },
  {
    path: 'signin', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'setting', component: SettingpageComponent, canActivate:[AuthguardService]
  },
  {
    path: 'editor', component: NewarticleComponent, canActivate:[AuthguardService]
  },
  {
    path: 'article/:slug', component: SinglearticleComponent
  },
  {
    path: 'editor/:slug', component: NewarticleComponent, canActivate:[AuthguardService]
  },
  {
    path: 'profile/:username', component: ProfileComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    NewarticleComponent,
    SettingpageComponent,
    PopulartagsComponent,
    ArticleComponent,
    SinglearticleComponent,
    ProfileComponent,
    CommentComponent,
    ErrorslistComponent,
    FeedsdisplayComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, ShowarticleService, CommentsService, AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }